import { Component, OnInit } from '@angular/core';
import { PowerManagementService } from '../../../service/power-management.service';
import { MatDialog } from '@angular/material';
import { CreateUserComponent } from '../create-user/create-user.component';
import { CreateRoleComponent } from '../create-role/create-role.component';

@Component({
  selector: 'app-power-manage',
  templateUrl: './power-manage.component.html',
  styleUrls: ['./power-manage.component.scss']
})
export class PowerManageComponent implements OnInit {

  constructor(
    public pmService: PowerManagementService,
    public dialog: MatDialog
  ) { }

  powerData: any[] = null;
  powerDataSelectedId = null;
  roleData: any[] = null;
  roleSelectedAll = false;
  activeRoleId: number = null;

  async ngOnInit() {
    if (!this.pmService.rolePowerDataHolder) {
      this.pmService.getAllRolePowerData();
    }
    this.computeData();
  }

  activeRole(role) {
    for (const item of this.roleData) {
      item.active = false;
    }
    this.activeRoleId = role.rid;
    role.active = true;
    this.computeRolePower();
  }

  selectRole(role, isSelectedAll?: boolean) {
    if (isSelectedAll) {
      this.roleSelectedAll = !this.roleSelectedAll;
      for (const item of this.roleData) {
        item.selected = this.roleSelectedAll;
      }
      return;
    }
    role.selected = !role.selected;
  }

  toggleRolePower(power, action: boolean) {
    power.hasThisPower = action;
    const powerAcids = [];
    for (const item of this.powerData) {
      if (item.hasThisPower) {
        powerAcids.push(item.acid);
      }
    }
    this.pmService.updatePowerOfRole(this.activeRoleId, powerAcids);
  }

  createRole() {
    const dialogRef = this.dialog.open(CreateRoleComponent);
    dialogRef.afterClosed().subscribe(async val => {
      if (dialogRef.componentInstance.isCancel) {
        return;
      }
      await this.pmService.createRole(dialogRef.componentInstance.name);
      this.pmService.powerDataHolder = null;
      this.computeData();
    });
  }

  async  deleteRole() {
    for (const item of this.roleData) {
      if (item.selected) {
        await this.pmService.deleteRole(item.rid);
      }
    }
    this.pmService.powerDataHolder = null;
    this.computeData();
  }

  private computeRolePower() {
    for (const item of this.pmService.rolePowerDataHolder) {
      if (item.rid === this.activeRoleId) {
        for (const subItem of item.accesses) {
          for (const power of this.powerData) {
            if (power.acid === subItem.acid) {
              power.hasThisPower = true;
            } else {
              power.hasThisPower = false;
            }
          }
        }
      }
    }
  }

  private async computeData() {
    if (!this.pmService.powerDataHolder) {
      await this.pmService.getAllPowerData();
      await this.pmService.getAllRoleData();
    }
    this.powerData = [];
    for (const item of this.pmService.powerDataHolder) {
      this.powerData.push(Object.assign(item, { hasThisPower: false }));
    }
    console.log(this.powerData);
    this.roleData = [];
    for (const item of this.pmService.roleDataHolder) {
      this.roleData.push(Object.assign(item, { selected: false, active: false }));
    }
  }
}
