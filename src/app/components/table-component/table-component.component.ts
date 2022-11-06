import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit, AfterViewInit {

  public array : any = [];

  public displayedColumns: string[] = ['name', 'address', 'phone'];

  constructor(
    private dataService: DataServiceService

  ) { }

  public ELEMENT_DATA : Array<any> = [
    // { name: 'Diego Puto', address: 'Prado bonito', phone: 123123},
    // {position: 1, name: 'Diego Puto', address: 'Prado Bonito', phone: 6669842},
  ];
 dataSource = this.ELEMENT_DATA;
  
  ngOnInit(): void {
   this.dataService.dataEmitter.subscribe(data =>{
      this.ELEMENT_DATA.push(data)
      console.log('recibiendo data', this.ELEMENT_DATA[0])
    })

  }

  ngAfterViewInit(): void {
    console.log('asdasd')
    console.log('asdas122d')
    console.log('asda55sd')
  }

}
