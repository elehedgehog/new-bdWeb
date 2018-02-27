import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { format } from 'date-fns';

@Injectable()
export class DataStorageService {

  constructor(
    public http: HttpClient
  ) { }
  private baseUrl = 'http://10.148.83.221:10190/bigdata';
  private infoUrl = '/collect/storage/data/percent/info';   //获取数据比例信息接口
  private spaceUrl = '/collect/storage/space/info';     //获取存储空间信息接口 
  private fieldUrl = '/collect/storage/data/field/info';   //获取数据字段统计信息接口
  private serversUrl = `/collect/storage/servers` //获取所有不同服务器接口
  private detailUrl = `/collect/storage/data/field/detail/info` //获取数据字段详细信息接口
  private indexDetailUrl = `/collect/storage/data/index/detail/info` //获取数据字段二级详细信息接口

  async getInfo() {  //获取数据比例信息接口
    let res: { data: storageInfo } = null;
    try {
      res = <{ data: storageInfo }>(await this.http
        .get(this.baseUrl + this.infoUrl).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }
  async getSpace() {  //获取存储空间信息接口 
    let res: { data: storageSpace[] } = null;
    try {
      res = <{ data: storageSpace[] }>(await this.http
        .get(this.baseUrl + this.spaceUrl).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }
  async getField(id: string) {  //获取数据字段统计信息接口
    let res: { data: storageField[] } = null;
    try {
      res = <{ data: storageField[] }>(await this.http
        .get(this.baseUrl + this.fieldUrl + (id ? '?id=' + id : '')).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }
  async getServers() {  //获取不同服务器接口
    let res: { data: string[] } = null;
    try {
      res = <{ data: string[] }>(await this.http
        .get(this.baseUrl + this.serversUrl).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }

  async getDetail(id: string, collectName: string) {  //数据字段详细信息接口
    let res: { data: storageDetail[] } = null;
    try {
      res = <{ data: storageDetail[] }>(await this.http
        .get(this.baseUrl + this.detailUrl + '?id=' + id + '&collectName=' + collectName).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }
  async getIndexDetail(id: string, collectName: string,currentPage: number, pageSize: number,field: string,fieldType: number) {  //数据字段详细信息接口
    let res: { data: storageIndexDetail[] } = null;
    try {
      res = <{ data: storageIndexDetail[] }>(await this.http
        .get(this.baseUrl + this.indexDetailUrl + '?id=' + id + '&collectName=' + collectName + '&currentPage=' + currentPage+ '&pageSize=' + pageSize+ '&field=' + field+ '&fieldType=' + fieldType).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }



}