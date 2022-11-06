import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  @Output() dataEmitter: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
