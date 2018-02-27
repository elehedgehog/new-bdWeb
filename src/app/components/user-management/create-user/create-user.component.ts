import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PowerManagementService } from '../../../service/power-management.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      uid?: number
      username: string
      phone: string,
      userServerRoleData: {
        csid: string
        rid: number
        uid: number
        user: string
      }[]
    },
    public pmService: PowerManagementService
  ) {
    for (const key in this.data) {
      this[key] = this.data[key];
    }
  }

  isEdit = false;
  username: string = null;
  password: string = null;
  phone: string = null;
  isCancel = false;
  serverData: ServerData[] = null;
  activeServerId: string = null;
  serverRoleData = [];

  async ngOnInit() {
    if (!this.pmService.serverDataHolder) {
      await this.pmService.getAllServerData();
    }
    if (!this.pmService.roleDataHolder) {
      await this.pmService.getAllRoleData();
    }
    this.serverData = [];
    for (const item of this.pmService.serverDataHolder) {
      const roleHolder = [];
      for (const role of this.pmService.roleDataHolder) {
        if (this.isEdit) {
          let hasThisRole = false;
          for (const holder of this.data.userServerRoleData) {
            if (holder.rid === role.rid) {
              hasThisRole = true;
              break;
            }
          }
          roleHolder.push(Object.assign(role, { isSelected: hasThisRole }));
        } else {
          roleHolder.push(Object.assign(role, { isSelected: false }));
        }
      }
      this.serverData.push(Object.assign(item, {
        roleData: roleHolder,
        active: false, hasSelectedRole: false
      }));
    }
  }

  hasSelectedRole(server) {
    if (this.isEdit) {
      return this.isEdit;
    }
    let hasSelected = false;
    for (const item of this.serverRoleData) {
      if (item.isSelected) {
        hasSelected = true;
        break;
      }
    }
    return hasSelected;
  }

  selectRole(role) {
    for (const item of this.serverRoleData) {
      item.isSelected = false;
    }
    role.isSelected = true;
  }

  async activeServer(server: ServerData) {
    for (const item of this.serverData) {
      item.active = false;
    }
    server.active = true;
    this.serverRoleData = server.roleData;
    this.activeServerId = server.csid;
  }

  submit() {
    if (!this.username || !this.password || !this.phone) {
      // #加上提示
      return;
    }
    if (this.isEdit) {
      const serverIds = [];
      for (const item of this.serverData) {
        let roleId = null;
        for (const subItem of item.roleData) {
          if (subItem.isSelected) {
            roleId = subItem.rid;
          }
        }
        serverIds.push({
          csid: item.csid,
          rid: roleId
        });
      }
      this.pmService.editUser(this.data.uid.toString(), this.username,
        this.password, this.phone, serverIds);
      this.dialogRef.close();
    } else {
      const serverIds = [];
      for (const item of this.serverData) {
        const isSelected = this.hasSelectedRole(item);
        if (!isSelected) {
          continue;
        }
        let roleId = null;
        for (const subItem of item.roleData) {
          if (subItem.isSelected) {
            roleId = subItem.rid;
          }
        }
        serverIds.push({
          csid: item.csid,
          rid: roleId
        });
      }
      this.pmService.createUser(this.username, this.password, this.phone, serverIds);
      this.dialogRef.close();
    }
  }

  close() {
    this.isCancel = true;
  }
}
