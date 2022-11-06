import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() cambioArray =  new EventEmitter<any[]>();


public array: Array<Object> = []
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    private fb: FormBuilder,
    private dataService : DataServiceService
  ) { }


  addForm = this.fb.group({
    name: new FormControl({ value: '', disabled: false }),
    address: new FormControl({ value: '', disabled: false }),
    phone: new FormControl({ value: '', disabled: false }),
  })

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close({ });
  }

  sub() {
    this.dataService.dataEmitter.emit({...this.addForm.value})
    this.onNoClick()
  }

  
}
