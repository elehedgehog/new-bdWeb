import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PowerManagementService {

  constructor(
    private http: HttpClient
  ) { }

  powerDataHolder: {
    asid: number,
    name: string
  }[] = null;
  roleDataHolder: {
    rid: number,
    name: string
  }[] = null;
  rolePowerDataHolder: {
    rid: number,
    name: string,
    accesses: {
      acid: number
      name: string
    }[]
  }[] = null;
  serverDataHolder: ServerData[] = null;
  userDataHolder: {
    uid: number,
    username: string
  }[] = null;

  async createRole(name: string) {
    const params = new HttpParams()
      .append('name', name);
    const res = await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/role/add', { params }).toPromise();
    return res;
  }

  async deleteRole(rid: number) {
    const params = new HttpParams()
      .append('rid', rid.toString());
    const res = await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/role/delete', { params }).toPromise();
    return res;
  }

  async updatePowerOfRole(roleId: number, acids: number[]) {
    const params = new HttpParams()
      .append('rid', roleId.toString())
      .append('acids', acids.join(','));
    const res = await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/middle/ra/update', { params }).toPromise();
    return res;
  }

  async updateUserRoleInEachServer(oldRid: string, oldCsid: string, oldUid: string,
    newRid: string, newCsid: string, newUid: string) {
    const params = new HttpParams()
      .append('oldRid', oldRid)
      .append('oldCsid', oldCsid)
      .append('oldUid', oldUid)
      .append('newRid', newRid)
      .append('newCsid', newCsid)
      .append('newUid', newUid);
    const res = await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/middle/rus/update', { params }).toPromise();
    return res;
  }

  async getServerAllUserRole(csid: number) {
    const params = new HttpParams()
      .append('csid', csid.toString(0));
    const res = await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/middle/rus/all', { params }).toPromise();
    return res;
  }

  async getUserRoleInEachServer(uid: number) {
    const params = new HttpParams()
      .append('uid', uid.toString());
    const res = await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/middle/rus/all', { params }).toPromise();
    return res;
  }

  async createUser(name: string, pwd: string, phone: string,
    serverIds?: number[]) {
    const params = {
      user: {
        username: name,
        password: pwd,
        phone
      },
      ruses: serverIds
    };
    const res = await this.http.post('http://10.148.83.221:10190'
      + '/bigdata/access/control/user/admin/add', params, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).toPromise();
  }

  async deleteUser(uid: string) {
    const params = new HttpParams()
      .append('uid', uid);
    const res = await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/user/delete', { params }).toPromise();
    return res;
  }

  async editUser(uid: string, name: string, pwd: string, phone: string,
    serverIds?: number[]) {
    const params = {
      user: {
        uid,
        username: name,
        password: pwd,
        phone
      },
      ruses: serverIds
    };
    const res = await this.http.post('http://10.148.83.221:10190'
      + '/bigdata/access/control/user/admin/update', params, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).toPromise();
    return res;
  }

  async getAllRolePowerData() {
    const res: any = (await this.http.get('http://10.148.83.221:10190/bigdata'
      + '/access/control/middle/ra/all?cache=' + Date.now())
      .toPromise());
    this.rolePowerDataHolder = res.data;
  }

  async updateServerRoleData() {
  }

  async getAllServerData() {
    const res = <{
      data: ServerData[],
      stateCode: number,
      message: string
    }>(await this.http.get('http://10.148.83.221:10190/bigdata'
      + '/collect/monitor/server/infos?cache=' + Date.now())
      .toPromise());
    this.serverDataHolder = res.data;
  }

  async getAllRoleData() {
    const res = <{
      data: {
        rid: number,
        name: string
      }[]
      stateCode: number
      message: string
    }>(await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/role/all?cache=' + Date.now()).toPromise());
    this.roleDataHolder = res.data;
  }

  async getRoleOfServerByUserId(uid) {
    const params = new HttpParams()
      .append('uid', uid);
    const res: any = await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/middle/rus/all', { params }).toPromise();
    return res.data;
  }

  async getRoleOfServerByServerId(csid) {
    const params = new HttpParams()
      .append('csid', csid);
    const res: any = await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/middle/rus/all', { params }).toPromise();
    return res.data;
  }

  async getRoleOfServerByRoleId(roleId) {
    const params = new HttpParams()
      .append('rid', roleId);
    const res: any = await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/middle/rus/all', { params }).toPromise();
    return res.data;
  }

  async getAllPowerData() {
    const res = <{
      data: {
        asid: number,
        name: string
      }[]
      stateCode: number
      message: string
    }>(await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/access/all?cache=' + Date.now()).toPromise());
    this.powerDataHolder = res.data;
  }

  async getAllUserData() {
    const res = <{
      data: {
        uid: number,
        username: string
      }[]
      stateCode: number
      message: string
    }>(await this.http.get('http://10.148.83.221:10190'
      + '/bigdata/access/control/user/all?cache=' + Date.now()).toPromise());
    this.userDataHolder = res.data;
  }
}

