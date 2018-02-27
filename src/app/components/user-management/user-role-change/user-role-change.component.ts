import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PowerManagementService } from '../../../service/power-management.service';

@Component({
  selector: 'app-user-role-change',
  templateUrl: './user-role-change.component.html',
  styleUrls: ['./user-role-change.component.scss']
})
export class UserRoleChangeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserRoleChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pmService: PowerManagementService) {
  }

  serverData = [];
  roleData = [];

  async ngOnInit() {
    if (!this.pmService.serverDataHolder) {
      await this.pmService.getAllServerData();
    }
    if (!this.pmService.roleDataHolder) {
      await this.pmService.getAllRoleData();
    }
    this.roleData = [];
    for (const role of this.pmService.roleDataHolder) {
      this.roleData.push(Object.assign(role, { isSelected: role.rid === this.data.rid }));
    }
  }

  async selectItem(role) {
    for (const item of this.roleData) {
      item.isSelected = false;
    }
    role.isSelected = true;
    this.pmService.updateUserRoleInEachServer(this.data.rid, this.data.csid, this.data.uid,
      role.rid, role.csid, role.uid);
  }

  close() {
    this.dialogRef.close();
  }
}
