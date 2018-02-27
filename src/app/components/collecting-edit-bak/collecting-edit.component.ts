import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { Zh } from '../../class/zh';

@Component({
  selector: 'app-collecting-edit',
  templateUrl: './collecting-edit.component.html',
  styleUrls: ['./collecting-edit.component.scss']
})
export class CollectingEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CollectingEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AllInfo__Task
  ) {
  }

  zh = Zh;
  isShowLabelPanel = false;

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
