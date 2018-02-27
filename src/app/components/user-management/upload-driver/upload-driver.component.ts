import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-upload-driver',
  templateUrl: './upload-driver.component.html',
  styleUrls: ['./upload-driver.component.scss']
})
export class UploadDriverComponent implements OnInit {

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
  }

  close() { }

  openFilePicker() {
    console.log('openFilePicker');
    const ele = <HTMLInputElement>document.body.querySelector('#uploadDriver');
    console.log(ele);
    ele.click();
  }

  async fileChange(event) {
    const fileArr: string[] = event.srcElement.files[0].name.split('.');
    if (fileArr[fileArr.length - 1] !== 'jar') {
      // # 插入提示
      return;
    }
    const form = new FormData();
    form.append('jar', event.srcElement.files[0]);
    const res: any = await this.http.post('http://10.148.83.221:10190'
      + '/bigdata/driver/manager/jar/upload', form).toPromise();
    console.log(res);
  }

}
