import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';

@Injectable()
export class DataServiceService {

  constructor(
    private http: HttpClient
  ) { }


  serverData: any[] = [];
  serverDataForRender: any[] = [];
  selectedItemKey = '';
  argsData: any = [];
  isSearch = false;
  des = '';
  example = '';

  getServerData() {
    return new Promise((resolve) => {
      this.http.get('http://10.148.83.221:10190/bigdata/collect/service/urls')
        .subscribe((val: any) => {
          this.serverData = val.data;
          this.serverDataForRender = [].concat(this.serverData);
          resolve();
        });
    });
  }

  search(val: string) {
    if (val.length === 0) {
      this.serverDataForRender = [].concat(this.serverData);
      this.isSearch = false;
    } else {
      const computedData = [];
      for (const item of this.serverData) {
        const res = computeItem(Object.assign({}, item));
        if (res) {
          computedData.push(res);
        }
      }
      this.serverDataForRender = computedData;
      this.isSearch = true;
    }

    function computeItem(data) {
      const subHolder = [];
      if (data.dirtype === 'group') {
        for (const subItem of data.subs) {
          const res = computeItem(subItem);
          if (res) {
            subHolder.push(res);
          }
        }
        if (subHolder.length > 0) {
          data.subs = subHolder;
          return data;
        } else {
          return null;
        }
      } else {
        if ((typeof data.name === 'string' && data.name.includes(val)) ||
          (typeof data.cname === 'string' && data.cname.includes(val)) ||
          (typeof data.url === 'string' && data.url.includes(val))) {
          return data;
        } else {
          return null;
        }
      }
    }
  }

}
