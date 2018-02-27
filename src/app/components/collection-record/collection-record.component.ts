import { Component, OnInit } from '@angular/core';
import { TaskMonitorService } from '../../service/task-monitor.service';

@Component({
  selector: 'app-collection-record',
  templateUrl: './collection-record.component.html',
  styleUrls: ['./collection-record.component.scss']
})
export class CollectionRecordComponent implements OnInit {

  constructor(
    public taskMonitorService: TaskMonitorService
  ) { }


  allCollectingData: any[] = [];
  allCollectingDataForRender: AllCollectingTaskForTable[] = [];
  expanded = false;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  filter: FilterCondition = null;

  ngOnInit() {
    this.getAllRecordData();
  }

  filterChange(event: FilterCondition) {
    this.filter = event;
    this.getAllRecordData(event);
  }

  pageChange(event: { pageSize: number, pageIndex: number, length: 10 }) {
    if (this.pageSize !== event.pageSize && this.pageIndex === this.pageIndex) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.allCollectingDataForRender = this.allCollectingData.slice(this.pageIndex * this.pageSize,
        (this.pageIndex + 1) * this.pageSize);
    }
    if (this.pageSize === event.pageSize && this.pageIndex !== event.pageIndex) {
      this.getAllRecordData(this.filter);
    }
  }

  async getAllRecordData(filter?: FilterCondition) {
    const res = await this.taskMonitorService.getAllRecordData(this.pageIndex + 1, this.pageSize,
      filter);
      console.log(res);
    if (!res) {
      return;
    }
    this.allCollectingData = res.dataForTable;
    this.length = res.totalCount;
    this.allCollectingDataForRender = this.allCollectingData.slice(this.pageIndex,
      (this.pageIndex + 1) * this.pageSize);
    console.log(this.allCollectingDataForRender);
  }
}
