import { Component, OnInit } from '@angular/core';
import { PowerManagementService } from '../../../service/power-management.service';
import { MatDialog } from '@angular/material';
import { UserRoleChangeComponent } from '../user-role-change/user-role-change.component';

@Component({
  selector: 'app-server-manage',
  templateUrl: './server-manage.component.html',
  styleUrls: ['./server-manage.component.scss']
})
export class ServerManageComponent implements OnInit {

  constructor(
    public pmService: PowerManagementService,
    public dialog: MatDialog
  ) { }

  roleData: any[] = [];
  activeServerId = null;
  userData = [];
  serverData = [];

  ngOnInit() {
    this.computeData();
    if (!this.pmService.userDataHolder) {
      this.pmService.getAllUserData();
    }
  }

  activeServer(server) {
    for (const item of this.serverData) {
      item.active = false;
    }
    server.active = true;
    this.activeServerId = server.csid;
    this.getUserByServerId();
  }

  async getUserByServerId() {
    this.roleData = await this.pmService.getRoleOfServerByServerId(this.activeServerId);
    this.userData = [];
    for (const item of this.roleData) {
      let targetUser = null;
      for (const user of this.pmService.userDataHolder) {
        if (user.uid === item.uid) {
          targetUser = user;
        }
      }
      this.userData.push(Object.assign(item, { username: targetUser.username }));
    }
  }

  async editServer(item) {
    this.dialog.open(UserRoleChangeComponent, {
      data: item
    });
  }

  async  computeData() {
    if (!this.pmService.serverDataHolder) {
      await this.pmService.getAllServerData();
    }
    if (!this.pmService.userDataHolder) {
      await this.pmService.getAllUserData();
    }

    this.serverData = [];
    for (const item of this.pmService.serverDataHolder) {
      this.serverData.push(Object.assign(item, { active: false }));
    }

    this.roleData = [];
    for (const item of this.pmService.userDataHolder) {
      this.roleData.push(Object.assign(item, { active: false, selected: false }));
    }
  }
}
