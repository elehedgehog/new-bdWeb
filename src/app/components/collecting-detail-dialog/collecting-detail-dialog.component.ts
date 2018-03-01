import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { HttpParams, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { format } from 'date-fns';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'app-collecting-detail-dialog',
  templateUrl: './collecting-detail-dialog.component.html',
  styleUrls: ['./collecting-detail-dialog.component.scss']
})
export class CollectingDetailDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CollectingDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AllInfo__Task,
    private http: HttpClient,
    private dialogService: DialogService
  ) { }

  loop = Array(500).fill(4);
  scaleBarData: ScaleBarData[] = [];
  detailData: DetailData[] = null;
  scaleBarColorArr = [
    '#edf6f5',
    '#c6ede8',
    '#a8e1da',
    '#cdd8d2',
    '#d7beba',
    '#e6918e',
    '#fb5756',
    '#ca3a39',
    '#8b2324',
    '#8b2324'
  ];
  atomColorArr = [
    '#c6ede8',
    '#a5cfe6',
    '#fa8f46',
    '#fb5756'
  ];
  colorText = [
    { color: '#c6ede8', text: '成功' },
    { color: '#a5cfe6', text: '数据结果缺失' },
    { color: '#fa8f46', text: '数据源缺失' },
    { color: '#fb5756', text: '延期超时' }
  ];
  scaleItemSelected: BehaviorSubject<ScaleBarData> = new BehaviorSubject(null);
  detailItemSelected: BehaviorSubject<DetailData> = new BehaviorSubject(null);
  isFreshDataNeeded = false;

  async ngOnInit() {
    await this.getProgressBarData();
    this.addScaleItemSelectedEvent();
  }

  async toggleStatus(type: string) {
    const params = new HttpParams()
      .append('ctid', this.data.ctid.toString())
      .append('csid', this.data.csid.toString())
      .append('status', type);
    const res: any = await this.http.get('http://10.148.83.221:10190/bigdata'
      + '/collect/monitor/application/task/status/update', { params }).toPromise();
    if (res.stateCode === 0) {
      this.data.status = type;
      switch (type) {
        case 'running': this.data.statusText = '运行中'; break;
        case 'pause': this.data.statusText = '暂停'; break;
        default: this.isFreshDataNeeded = true; this.dialogRef.close(); break;
      }
    } else {
      // #插入提示
      this.dialogService.displayTip('error', res.message);
    }
  }

  close() {
    this.dialogRef.close();
  }

  selectScaleBarItem(item: ScaleBarData) {
    for (const scaleItem of this.scaleBarData) {
      scaleItem.selected = false;
    }
    item.selected = true;
    this.scaleItemSelected.next(item);
    this.detailItemSelected.next(null);
  }

  selectDetailItem(item: DetailData) {
    for (const scaleItem of this.detailData) {
      scaleItem.selected = false;
    }
    item.selected = true;
    console.log(item);
    this.detailItemSelected.next(item);
  }

  getTimeText(date: number) {
    return format(date, 'YYYY/MM/DD HH:mm:ss');
  }

  getStatusText(status: string) {
    switch (status) {
      case 'complete': return '完成';
      case 'source_incomplete': return '数据源缺失';
      case 'result_incomplete': return '处理结果缺失';
      case 'deadline_exceeded': return '超时';
    }
  }

  private addScaleItemSelectedEvent() {
    this.scaleItemSelected.subscribe(async val => {
      if (!val) {
        return;
      }
      await this.getProgressDetailData(val.currentPage.toString());
      console.log(this.detailData);
    });
  }

  private addDetailItemSelectedEvent() {
    this.detailItemSelected.subscribe(val => {
      if (!val) {
        return;
      }
    });
  }

  private async getProgressBarData() {
    const params = new HttpParams()
      .append('ctid', this.data.ctid.toString());

    const res: any = await this.http.get('http://10.148.83.221:10190/bigdata/collect'
      + '/monitor/application/tasks/history/page/info', {
        params
      }).toPromise();

    const holder = [];
    for (const item of res.data) {
      const result = Math.round(item.errPercent / 10);
      holder.push(Object.assign(item, {
        color: this.scaleBarColorArr[result === 0 ? 0 : result - 1],
        selected: false
      }));
    }
    this.scaleBarData = holder;
    console.log(holder);
  }

  private async getProgressDetailData(page: string) {
    const params = new HttpParams()
      .append('currentPage', page)
      .append('ctid', this.data.ctid.toString());

    const res: any = await this.http.get('http://10.148.83.221:10190/bigdata/collect'
      + '/monitor/application/tasks/history/page/info', {
        params
      }).toPromise();

    const holder = [];
    for (const item of res.data) {
      let color = null;
      item.status === 'complete' ? color = this.atomColorArr[0] :
        item.status === 'source_incomplete' ? color = this.atomColorArr[1] :
          item.status === 'result_incomplete' ? color = this.atomColorArr[2] :
            color = this.atomColorArr[3];
      holder.push(Object.assign(item, { color, selected: false }));
    }

    this.detailData = holder;
  }
}

interface ScaleBarData {
  starttime: number;
  endtie: number;
  color: string;
  selected: boolean;
  errPercent: number;
  currentPage: number;
}

interface DetailData {
  dataSourceNum: number;
  dataSourceSize: number;
  status: number;
  selected: boolean;
  color: string;
  erros: {
    fleName: string,
    message: string
  }[];
}
