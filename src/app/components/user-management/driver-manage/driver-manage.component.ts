import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadDriverComponent } from '../upload-driver/upload-driver.component';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-driver-manage',
  templateUrl: './driver-manage.component.html',
  styleUrls: ['./driver-manage.component.scss']
})
export class DriverManageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private http: HttpClient
  ) { }

  driverData = [];
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];
  pageIndex = 0;
  driverDataHolder = [];

  ngOnInit() {
    this.getAllDriverData();
  }

  uploadDriver() {
    this.dialog.open(UploadDriverComponent);
  }

  private async getAllDriverData() {
    const res: any = await this.http.get('http://10.148.83.221:10190/bigdata'
      + '/collect/monitor/application/infos').toPromise();
    this.driverDataHolder = JSON.parse(JSON.stringify(res.data));
    this.computeData();
  }

  pageChange(e) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.computeData();
  }

  computeData() {
    this.driverData = this.driverDataHolder.slice(this.pageIndex * this.pageSize,
      (this.pageIndex + 1) * this.pageSize);
  }

}
