import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateRoleComponent>
  ) { }

  name: string = null;
  isCancel = false;

  ngOnInit() {
  }

  close() {
    this.isCancel = true;
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close();
  }
}
