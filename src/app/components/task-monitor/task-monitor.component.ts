import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TaskMonitorService } from '../../service/task-monitor.service';
import Stomp from 'stompjs';
import { MatDialog } from '@angular/material';
import {
  CollectingDetailDialogComponent
} from '../collecting-detail-dialog/collecting-detail-dialog.component';
import { FilterCondition } from '../../class/filter-condition';
import { EventEmitter } from 'events';
import { CollectingEditComponent } from '../collecting-edit/collecting-edit.component';
import { DialogService } from '../../dialog/dialog.service';

let client

@Component({
  selector: 'app-task-monitor',
  templateUrl: './task-monitor.component.html',
  styleUrls: ['./task-monitor.component.scss']
})
export class TaskMonitorComponent implements OnInit, OnDestroy {

  constructor(
    public taskMonitorService: TaskMonitorService,
    public dialog: MatDialog,
    public changeDetectionRef: ChangeDetectorRef,
    public dialogService: DialogService
  ) { }

  pageSize = 10;
  pageIndex = 0;
  filterCondition = new FilterCondition();
  allCollectingData: AllCollectingTaskForTable[] = [];
  allCollectingDataForRender: AllCollectingTaskForTable[] = [];
  newTaskPop: boolean = true

  driverList = [           //测试数据
    { name:'asdf', versiono:'1.0', versiont:'1.0',cname: '大数据平台', author: '某某', content: '-'},
    { name:'asdf', versiono:'1.0', versiont:'1.0',cname: '大数据平台', author: '某某', content: '-'},
    { name:'asdf', versiono:'1.0', versiont:'1.0',cname: '大数据平台', author: '某某', content: '-'},
    { name:'asdf', versiono:'1.0', versiont:'1.0',cname: '大数据平台', author: '某某', content: '-'},
    { name:'asdf', versiono:'1.0', versiont:'1.0',cname: '大数据平台', author: '某某', content: '-'},
    { name:'asdf', versiono:'1.0', versiont:'1.0',cname: '大数据平台', author: '某某', content: '-'},
    { name:'asdf', versiono:'1.0', versiont:'1.0',cname: '大数据平台', author: '某某', content: '-'},
    { name:'asdf', versiono:'1.0', versiont:'1.0',cname: '大数据平台', author: '某某', content: '-'},
    { name:'asdf', versiono:'1.0', versiont:'1.0',cname: '大数据平台', author: '某某', content: '-'},
    { name:'asdf', versiono:'1.0', versiont:'1.0',cname: '大数据平台', author: '某某', content: '-'}
  ]
  step: number = 1

  async ngOnInit() {
    this.getAllTaskData();
    this.initWebSocket();
  }

  ngOnDestroy() {
    client.disconnect()
  }

  filterChange(event: FilterCondition) {
    this.getAllTaskData(event);
  }

  lookingTaskDetail(data: AllInfo__Task) {
    this.dialog.open(CollectingDetailDialogComponent, {
      data
    });
  }

  initWebSocket() {              // 客户端实时接收错误任务信息
    const url = 'http://10.148.83.221:10190/bigdata/ws';
    const ws = new window['SockJS'](url);
    client = Stomp.over(ws);
    client.connect({}, frame => {
      client.subscribe('/client/process', message => {
        const data = JSON.parse(message.body);
        for (const item of this.allCollectingDataForRender) {
          for (const subItem of item.cts) {
            for (const thirdItem of data) {
              if (thirdItem.ctid === subItem.ctid) {
                subItem.upload = thirdItem.upload;
                subItem.download = thirdItem.download;
                subItem.readSpeed = thirdItem.readSpeed;
                subItem.writeSpeed = thirdItem.writeSpeed;
                subItem.usedCpu = thirdItem.usedCpu;
                subItem.usedMemory = thirdItem.usedMemory;
              }
            }
          }
        }
        this.changeDetectionRef.detectChanges();
      });
    });
  }

  getPublishText(item: number) {
    if (item < 1024) {
      return item + 'KB';
    } else if (item < 1024 * 1024) {
      return (item / 1024).toFixed(1) + 'MB';
    } else {
      return (item / 1024 / 1024).toFixed(1) + 'GB';
    }
  }

  editTask(data: AllInfo__Task) {
    this.dialog.open(CollectingEditComponent, {
      panelClass: 'dialog-container',
      data
    });
  }

  pageChange(event: { pageSize: number, pageIndex: number, length: 10 }) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.allCollectingDataForRender = this.allCollectingData.slice(this.pageIndex * this.pageSize,
      (this.pageIndex + 1) * this.pageSize);
  }

  async getAllTaskData(filter?: FilterCondition) {
    const res = await this.taskMonitorService.getAllTaskData(filter);
    if (!res) {
      return;
    }
    this.allCollectingData = res;
    this.allCollectingDataForRender = this.allCollectingData.slice(this.pageIndex,
      (this.pageIndex + 1) * this.pageSize);
    console.log(this.allCollectingDataForRender);
  }

  toggleNewTask(){      //新建任务
    this.newTaskPop = true
  }
  forwardStep(){   //上一步
    if (this.step !== 1)
      this.step--
  }
  nextStep(){  //下一步
    if (this.step !== 3)
      this.step++
  }
  finishStep(){
    this.newTaskPop = false
  }
}
