import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      type: 'warn' | 'error'  | 'success',
      title: string
      des: string
    },
  ) { }

  isConfirm = false;

  ngOnInit() {
  }

  confirm() {
    this.isConfirm = true;
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}
