import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user-audict',
  templateUrl: './user-audict.component.html',
  styleUrls: ['./user-audict.component.scss']
})
export class UserAudictComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  isPass = false;
  userData = [];
  userDataHolder = [];
  pageSize = 10;
  currentPage = 0;

  ngOnInit() {
    this.getAllUserData();
  }

  getTimeText(time: number) {
    return format(time, 'YYYY/MM/DD HH:MM');
  }

  private async getAllUserData() {
    const res: any = await this.http.get('http://10.148.83.221:10190/bigdata'
      + '/access/control/user/all').toPromise();
    this.userDataHolder = JSON.parse(JSON.stringify(res.data));
    this.computeUserData();
  }

  getLength() {
    let count = 0;
    for (const item of this.userDataHolder) {
      if ((item.isPass === 1) === this.isPass) {
        count++;
      }
    }
    return count;
  }

  async editUser(item, type) {
    const params = new HttpParams()
      .append('uid', item.uid)
      .append('isPass', type ? '1' : '0');
    await this.http.get('http://10.148.83.221:10190/bigdata'
      + '/access/control/user/update', { params }).toPromise();
    this.getAllUserData();
  }

  toggleIsPass() {
    this.isPass = !this.isPass;
    this.computeUserData();
  }

  pageChange(event) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.computeUserData();
  }

  computeUserData() {
    this.userData = [];
    for (let i = this.currentPage * this.pageSize;
      (i < this.userDataHolder.length && this.userData.length < this.pageSize); i++) {
      const item = this.userDataHolder[i];
      if ((item.isPass === 1) === this.isPass) {
        this.userData.push(Object.assign(item, {}));
      }
    }
  }

}
