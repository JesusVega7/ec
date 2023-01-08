import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import * as SecureLS from 'secure-ls';
import { environment } from '../../../environments/environment';
// import * as fileSaver from 'file-saver'

@Injectable()
export class ApiService {
  // Local variables //

  private url = environment.apiUrl;
  public currentUserValue = {};

  // Constructor //
  constructor(
      private http: HttpClient
  ) {}

  // Obtain objects from 1 collection //
  getDataObjects( type: string) {
    /*let url: string = type;
    if (url.includes(/#/g)) {
      url.replace(/#/g, '%23');
    }*/
    type = type.replace(/#/g, '%23');
    return this.http.get(this.url + type);
  }

  // Obtain object per id //
  getDataObject( type: string, id: string) {
    // // console.log(this.url  + type + id);
    return this.http.get(this.url + type + '/' + id);
  }
  // Renew User Tokens //
  deleteRelationInstances( type: string, id: string, relation:string) {
    // // console.log(this.url  + type + id);
    console.log(this.url + type + '/' + id + '/' + relation);
    return this.http.delete(this.url + type + '/' + id + '/' + relation);
  }

  // Obtain object per id //
  getExistObject( type: string, id: string) {
    // // console.log(this.url  + type + id);
    return this.http.get(this.url + type + '/' + id + '/exists');
  }

  // Add a new data object //
  addDataObject(model: any, type: string) {
    return this.http.post(this.url  + type, model);
  }

  // Add a new data object //
  addDataRelation(model: any, type: string, ralationType: string, id: string, fk: string) {
    return this.http.put(this.url  + type + '/' + id + '/' + ralationType + '/' + fk, model);
  }

  // Edit object per id //
  editDataObject(id: string, model: any , type: string) {
    return this.http.patch(this.url + type + '/' + id, model);
  }

  // Delete object per id //
  deleteDataObject(type: string, id: string) {
    return this.http.delete(this.url + type + '/' + id);
  }

  // Obtain data to fill table //
  getTableDataObjects(query: string) {
    query = query.replace(/#/g, '%23');
    return this.http.get(this.url + query);
  }


  // Obtain data from external services //
  getGenericDataObjects(query: string) {
    return this.http.get(query);
  }

    // Obtain data from external services //
  getGoogleToken(code: string, type: string) {
    let clientId;
    let clientSecret;

    if(type == 'com'){
      clientId = "799780109579-v9ubl8n7rqpvh4fdveosll2ehhe8agup.apps.googleusercontent.com";
      clientSecret = "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";
    }else if(type == 'net'){
      clientId = "996010386618-o4ql34ruepppaacb2a1k72fq1j2kf8qi.apps.googleusercontent.com";
      clientSecret = "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";
    }
    
    const enviroment = 'prod';

    const url = 'https://www.googleapis.com/oauth2/v4/token';
    const body = 'code=' + code + '&client_id=' + clientId + '&client_secret=' + clientSecret
        + '&grant_type=authorization_code' + '&redirect_uri=' + 'https://adroitoverseas.net/profile/';

        console.log(url, body, 'requests');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'authorization_code'
      })
    };

    return this.http.post(url, body, httpOptions);
  }

  useRemoteMethod(model: string, method: string, params: object) {
    const body = {
      ...params
    };
    return this.http.post(this.url + model + '/' + method, body);
  }

  useRemoteMethodString(model: string, method: string, data: string) {
    const body = {
      text:data
    }
    return this.http.post(this.url + model + '/' + method, body);
  }


}
