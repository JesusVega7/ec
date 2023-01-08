import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { QueryFactory } from 'src/app/tableQueries/queryFactory';
import { ApiService } from 'src/app/services/api/api.service';
import { debounceTime, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";


@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit, AfterViewInit {

  public array : any = [];

  public displayedColumns: string[] = ['name', 'email'];

  constructor(
    private dataService: DataServiceService, 
    private queryFactory : QueryFactory, 
    private apiService: ApiService

  ) { }

  
  public ELEMENT_DATA : Array<any> = [
    // { name: 'Diego Puto', address: 'Prado bonito', phone: 123123},
    // {position: 1, name: 'Diego Puto', address: 'Prado Bonito', phone: 6669842},
  ];
  private onDestroy = new Subject<void>();
  

  ngOnInit() {

    this.getData();


  }

  ngAfterViewInit(): void {

  }

  getData(){
    
    let whereQuery =  { };
    

    // let getQuery = this.queryFactory.generateGetQuery('users', whereQuery, 0, 0, 'createdAt desc', []);

    this.apiService.getDataObjects('users?page=2').pipe(takeUntil(this.onDestroy)).subscribe((data: any) => {
      this.ELEMENT_DATA = data.data;
      console.log(this.ELEMENT_DATA, 'a')

    });
  }

  showMsg(){
    console.log('ehehhe')
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
