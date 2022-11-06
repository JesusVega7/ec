import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './firstModal/modal/modal.component';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { OnDestroy, OnInit } from '@angular/core';
import { DataServiceService } from './services/data-service.service';

export interface PeriodicElement {
  name: string;
  address: string;
  phone: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,  OnDestroy {
  title = 'ec';
  private onDestroy = new Subject<void>();
  public array: any[] = [];

  
  constructor(

    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

  }
  
  openDialog() {
    let config;
      config = {

      };

    let dialogRef;
    dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe((data) => {});
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
