import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UserRoleChangeComponent } from '../user-role-change/user-role-change.component';
import { PowerManagementService } from '../../../service/power-management.service';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.scss']
})
export class RoleManageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public pmService: PowerManagementService
  ) { }

  userData: {
    uid: number
    username: string
    active: boolean
    selected: boolean
  }[] = null;
  activeUserData = null;
  userSelectAll = false;
  userSelectedId = null;
  serverData: ServerData[] = null;
  userServerRoleData = null;

  ngOnInit() {
    this.computeData();
  }

  selectUser(user, isSelectAll?: boolean) {
    if (isSelectAll) {
      this.userSelectAll = !this.userSelectAll;
      for (const item of this.userData) {
        item.selected = this.userSelectAll;
      }
      return;
    }
    user.selected = !user.selected;
  }

  async activeUser(user) {
    for (const item of this.userData) {
      item.active = false;
    }
    user.active = true;
    this.activeUserData = user;
    const res: any = await this.pmService.getRoleOfServerByUserId(user.uid);
    this.userServerRoleData = res;
  }

  editUser() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: {
        isEdit: true,
        username: this.activeUserData.username,
        password: this.activeUserData.password,
        phone: this.activeUserData.phone,
        userServerRoleData: this.userServerRoleData
      }
    });
  }

  createUser() {
    const dialogRef = this.dialog.open(CreateUserComponent);
    this.computeData();
  }

  async deleteUser() {
    const userIdArr = [];
    for (const item of this.userData) {
      if (item.selected) {
        await this.pmService.deleteUser(item.uid.toString());
      }
    }
    this.pmService.userDataHolder = null;
    this.computeData();
  }

  async  computeData() {
    if (!this.pmService.serverDataHolder) {
      await this.pmService.getAllServerData();
    }
    if (!this.pmService.userDataHolder) {
      await this.pmService.getAllUserData();
    }

    this.userData = [];
    for (const item of this.pmService.userDataHolder) {
      this.userData.push(Object.assign(item, { active: false, selected: false }));
    }
  }
}
