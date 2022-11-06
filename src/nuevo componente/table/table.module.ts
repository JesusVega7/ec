import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MaterialModule } from 'src/app/material/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule, 
    ReactiveFormsModule, 
    FormsModule,

  ], 
  exports: [
    TableComponent
  ],
  entryComponents: [
    TableComponent
  ],
})
export class TableModule { }
