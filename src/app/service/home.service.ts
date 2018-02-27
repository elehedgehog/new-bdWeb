import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable()
export class HomeService {
  constructor(
    public http: HttpClient
  ) { }
  private baseUrl = 'http://10.148.83.221:10190/bigdata';
  private alLabelsUrl = '/collect/monitor/application/task/labels';   
  private percentUrl = '/collect/monitor/task/history/status/percent';   
  private taskScheduleUrl = '/collect/monitor/application/tasks/schedule'; //获取任务进度接口
  private historyTimeUrl = '/collect/monitor/application/tasks/history/history/result';//根据年月日小时间隔获取任务接口接口
  private historyContinueUrl = '/collect/monitor/application/tasks/history/continue/start';// 根据任务历史结果数量与大小画实时曲线图接口
  private ntasksHistoryUrl = '/collect/monitor/application/ntasks/history/total/result'; // //根据每日，每月，每年，今年统计历史任务结果接口
  async getLabels() {
    let res: { data: string[] } = null;
    try {
      res = <{ data: string[] }>(await this.http
        .get(this.baseUrl + this.alLabelsUrl).toPromise());
    } catch (err) {
      return null;
      // throw err;
    }
    return res.data
  }
  async getPercent(suffix?: string) {
    let res: { data: statusPercent[] } = null;
    try {
      res = <{ data: statusPercent[] }>(await this.http
        .get(this.baseUrl + this.percentUrl + (suffix ? '?label=' + suffix : '')).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }
  async getTasksSchedule(nodeSize: number,suffix?: string) {  //获取任务进度接口
    let res: { data:taskSchedule[] } = null;
    try {
      res = <{ data: taskSchedule[] }>(await this.http
        .get(this.baseUrl + this.taskScheduleUrl + '?nodeSize=' + nodeSize + (suffix ? '&label=' + suffix : '')).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }
  async getHistoryTime(type: string, label?: string) {  //根据年月日小时间隔获取任务接口接口
    let res: { data: historyContinue } = null;
    try {
      res = <{ data: historyContinue }>(await this.http
        .get(this.baseUrl + this.historyTimeUrl + '?type=' + type + (label ? '&label=' + label : '')).toPromise());
    } catch (err) {
      return null;
      // throw err;
    }
    return res.data
  }

  async getHistoryContinue(interval: number, size: number, label?: string) { // 根据任务历史结果数量与大小画实时曲线图接口
    let res: { data: historyContinue } = null;
    try {
      res = <{ data: historyContinue }>(await this.http
        .get(this.baseUrl + this.historyContinueUrl + '?interval=' + interval + '&size=' + size + (label ? '&label=' + label : '')).toPromise());
    } catch (err) {
      return null;
      // throw err;
    }
    return res.data
  }

  async getNtasksHistory(size: number,type: string,label?: string,order?: string) { //根据每日，每月，每年，今年统计历史任务结果接口
    let res: { data:ntasksHistory[] } = null;
    try {
      res = <{ data: any[] }>(await this.http
        .get(this.baseUrl + this.ntasksHistoryUrl + '?size=' + size + '&type=' + type + (label ? '&label=' + label : '') + (order ? '&order=' + order : '')).toPromise());
    } catch (err) {
      return null;
      // throw err;
    }
    return res.data
  }



}