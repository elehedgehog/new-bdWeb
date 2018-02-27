import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      type: 'warn' | 'error' | 'success',
      tip: string
    },
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 5000);
  }

  close() {
    this.dialogRef.close();
  }

}
