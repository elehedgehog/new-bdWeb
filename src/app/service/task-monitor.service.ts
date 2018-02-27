import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { format } from 'date-fns';

@Injectable()
export class TaskMonitorService {

  constructor(
    public http: HttpClient
  ) { }

  private baseUrl = 'http://10.148.83.221:10190/bigdata';
  private allTaskUrl = '/collect/monitor/application/tasks';
  private allRecordUrl = '/collect/monitor/task/multi/condition/history/page';
  private allInfo = '/collect/monitor/all/infos';
  private allInfoHistory = '/collect/monitor/task/history/all/classify/infos';

  async getAllRecordData(pageIndex, pageSize, filter?: FilterCondition) {
    const params: any = {};
    params.currentPage = pageIndex;
    params.pageSize = pageSize;

    if (filter) {
      params.caids = filter.caids;
      params.csids = filter.csids;
      params.ctids = filter.ctids;
      params.labels = filter.labels;
      params.status = filter.status;
      if (filter.starttime) {
        params.starttime = filter.starttime.toString();
      }
      if (filter.endtime) {
        params.endtime = filter.endtime.toString();
      }
    }

    let res: {
      data: {
        objs: any[],
        totalCount: number
      }
    } = null;
    try {
      res = <{
        data: {
          objs: any[],
          totalCount: number
        }
      }>(await this.http
        .post(this.baseUrl + this.allRecordUrl, JSON.stringify(params), {
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).toPromise());
    } catch (err) {
      throw err;
    }

    const dataForTable: any[] = [];

    for (const item of res.data.objs) {
      dataForTable.push(Object.assign(item,
        { datetime: format(item.time, 'YYYY/MM/DD hh:mm:ss') }));
    }

    return { dataForTable, totalCount: res.data.totalCount };
  }

  async getAllTaskData(filter?: FilterCondition) {
    let params = new HttpParams();

    if (filter) {
      filter.caids.forEach(item => {
        params = params.set('caids', item.toString());
      });
      filter.csids.forEach(item => {
        params = params.set('csids', item.toString(0));
      });
      filter.ctids.forEach(item => {
        params = params.set('ctids', item.toString());
      });
      filter.labels.forEach(item => {
        params = params.set('labels', item);
      });
      filter.status.forEach(item => {
        params = params.set('status', item);
      });
      if (filter.starttime) {
        params = params.set('starttime', filter.starttime.toString());
      }
      if (filter.endtime) {
        params = params.set('endtime', filter.endtime.toString());
      }
    }

    let res: { data: AllCollectingTask[] } = null;
    try {
      res = <{ data: AllCollectingTask[] }>(await this.http
        .get(this.baseUrl + this.allTaskUrl, { params }).toPromise());
    } catch (err) {
      throw err;
    }

    const dataForTable: AllCollectingTaskForTable[] = [];

    for (const item of res.data) {
      const holder: AllCollectingTaskForTable = JSON.parse(JSON.stringify(item));
      holder.isMouseOver = false;
      for (const cts of holder.cts) {
        cts.isExpanded = false;
        cts.isMouseOver = false;
        cts.statusText = getStatusCNText(cts.status);
        cts.lastExecuteTime = format(cts.lastExecuteTime, 'YYYY/MM/DD HH:mm:ss');
      }
      dataForTable.push(holder);
    }

    return dataForTable;

    function getStatusCNText(text: string) {
      switch (text) {
        case 'running': return '运行中';
        case 'paused': return '暂停';
        case 'finished': return '已完成';
        case 'fault': return '故障';
      }
    }
  }

  async getTaskHistoryData(data: AllInfo__Task) {
    // const params = new HttpParams()
    //   .append('')
  }

  async getAllInfo(isHistory: boolean = false) {
    let res: { data: AllInfo } = null;
    try {
      res = <{ data: AllInfo }>(await this.http
        .get(this.baseUrl + (isHistory ? this.allInfoHistory : this.allInfo)).toPromise());
    } catch (err) {
      throw err;
    }

    return res.data;
  }
}

