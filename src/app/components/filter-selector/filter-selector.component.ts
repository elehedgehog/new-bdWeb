import { Component, OnInit } from '@angular/core';
import * as zh from 'date-fns/locale/zh_cn';
import { format } from 'date-fns';
import { TaskMonitorService } from '../../service/task-monitor.service';
import { Output, Input, EventEmitter } from '@angular/core';
import { FilterCondition } from '../../class/filter-condition';
import { Zh } from '../../class/zh';

@Component({
  selector: 'app-filter-selector',
  templateUrl: './filter-selector.component.html',
  styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent implements OnInit {

  @Input() isHistory = false;
  @Input() filter: FilterCondition = new FilterCondition();
  @Output() filterChange = new EventEmitter<FilterCondition>();

  constructor(
    public taskMonitorService: TaskMonitorService
  ) { }

  isExpanded = false;
  tasksExpanded = true;
  driverExpanded = false;
  labelExpanded = false;
  serverExpanded = false;
  lastExecuteTimeStart = new Date();
  lastExecuteTimeEnd = new Date();
  allInfoData: AllInfo = {
    servers: [],
    drivers: [],
    labels: [],
    tasks: []
  };
  zh = Zh;
  driverRender: AllInfo_Driver[] = [];
  driverFilter: number[] = [];
  driverDesHolder: string[] = [];

  taskRender: AllInfo__Task[] = [];
  taskFilter: number[] = [];
  taskDesHolder: string[] = [];

  labelRender: string[] = [];
  labelFilter: string[] = [];

  statusFilter: string[] = [];
  statusDesHolder: string[] = [];

  serverFilter: number[] = [];
  serverDesHolder: string[] = [];

  lastExecutedTime: string = null;

  async ngOnInit() {
    await this.getAllInfoData();
    this.computeDriverAfterServerToggled();
    this.computeTaskAfterDriverToggled();
    this.computeLabelAfterTaskToggled();
  }

  clearAllFilter() {
    this.driverRender = [];
    this.driverFilter = [];
    this.driverDesHolder = [];

    this.taskRender = [];
    this.taskFilter = [];
    this.taskDesHolder = [];

    this.labelRender = [];
    this.labelFilter = [];

    this.statusFilter = [];
    this.statusDesHolder = [];

    this.serverFilter = [];
    this.serverDesHolder = [];

    this.lastExecutedTime = null;

    this.computeDriverAfterServerToggled();
    this.computeTaskAfterDriverToggled();
    this.computeLabelAfterTaskToggled();
    this.filter = new FilterCondition();
    this.filterChange.emit(this.filter);
  }

  toggleLastExecutedTime(action: boolean) {
    if (action) {
      this.lastExecutedTime = format(this.lastExecuteTimeStart, 'YYYY/MM/DD HH:ss') + ' - '
        + format(this.lastExecuteTimeEnd, 'YYYY/MM/DD HH:ss');
    } else {
      this.lastExecutedTime = null;
    }
    this.filter.endtime = this.lastExecuteTimeStart.getTime();
    this.filter.starttime = this.lastExecuteTimeEnd.getTime();
    this.filterChange.emit(this.filter);
  }

  toggleStatus(target: string, isAll?: boolean) {
    if (isAll === true) {
      this.statusFilter = ['正常', '暂停', '结束', '异常'];
      return;
    } else if (isAll === false) {
      this.statusFilter = [];
      return;
    }

    if (this.statusFilter.includes(target)) {
      this.statusFilter.splice(this.statusFilter.indexOf(target), 1);
    } else {
      this.statusFilter.push(target);
    }
    this.filter.status = this.statusFilter;
    this.filterChange.emit(this.filter);
  }

  toggleLabelFilter(target: string, isAll?: boolean) {
    if (isAll === true) {
      this.labelFilter = [];
      this.labelRender.forEach(item => {
        this.labelFilter.push(item);
      });
      return;
    } else if (isAll === false) {
      this.labelFilter = [];
      return;
    }

    if (this.labelFilter.includes(target)) {
      this.labelFilter.splice(this.labelFilter.indexOf(target), 1);
    } else {
      this.labelFilter.push(target);
    }
    this.filter.labels = this.labelFilter;
    this.filterChange.emit(this.filter);
  }

  toggleTaskFilter(target: {
    caid: number,
    name: string,
    ctid: number
  }, isAll?: boolean) {
    if (isAll === true) {
      this.taskFilter = [];
      this.taskDesHolder = [];
      this.taskRender.forEach(item => {
        this.taskFilter.push(Number(item.caid));
        this.taskDesHolder.push(item.name);
      });
      return;
    } else if (isAll === false) {
      this.taskFilter = [];
      this.taskDesHolder = [];
      return;
    }

    if (this.taskFilter.includes(target.ctid) &&
      (this.driverFilter.length === 0 || this.driverFilter.includes(target.caid))) {
      this.taskFilter.splice(this.taskFilter.indexOf(target.ctid), 1);
      this.taskDesHolder.splice(this.taskDesHolder.indexOf(target.name), 1);
    } else {
      this.taskFilter.push(target.ctid);
      this.taskDesHolder.push(target.name);
    }

    this.computeLabelAfterTaskToggled();
    this.filter.ctids = this.taskFilter;
    this.filter.labels = this.labelFilter;
    this.filterChange.emit(this.filter);
  }

  toggleDriverFilter(target: {
    caid: number,
    chName: string,
    csid: number
  }, isAll?: boolean) {
    if (isAll === true) {
      this.driverFilter = [];
      this.driverDesHolder = [];
      this.driverRender.forEach(item => {
        this.driverFilter.push(item.caid);
        this.driverDesHolder.push(item.chName);
      });
      return;
    } else if (isAll === false) {
      this.driverFilter = [];
      this.driverDesHolder = [];
      return;
    }

    if (this.driverFilter.includes(target.caid) &&
      (this.serverFilter.length === 0 || this.serverFilter.includes(target.csid))) {
      this.driverFilter.splice(this.driverFilter.indexOf(target.caid), 1);
      this.driverDesHolder.splice(this.driverDesHolder.indexOf(target.chName), 1);
    } else {
      this.driverFilter.push(target.caid);
      this.driverDesHolder.push(target.chName);
    }

    this.computeTaskAfterDriverToggled();
    this.computeLabelAfterTaskToggled();
    this.filter.caids = this.serverFilter;
    this.filter.ctids = this.taskFilter;
    this.filter.labels = this.labelFilter;
    this.filterChange.emit(this.filter);
  }

  toggleServerFilter(target: { csid: number, description: string }, isAll?: boolean) {
    console.log(target);
    if (isAll === true) {
      this.serverFilter = [];
      this.serverDesHolder = [];
      this.allInfoData.servers.forEach(item => {
        this.serverFilter.push(item.csid);
        this.serverDesHolder.push(String(item.csid));
      });
      return;
    } else if (isAll === false) {
      this.serverFilter = [];
      this.serverDesHolder = [];
      return;
    }

    if (this.serverFilter.includes(target.csid)) {
      this.serverFilter.splice(this.serverFilter.indexOf(target.csid), 1);
      this.serverDesHolder.splice(this.serverDesHolder.indexOf(String(target.csid)), 1);
    } else {
      this.serverFilter.push(target.csid);
      this.serverDesHolder.push(String(target.csid));
    }

    this.computeDriverAfterServerToggled();
    this.computeTaskAfterDriverToggled();
    this.computeLabelAfterTaskToggled();
    this.filter.csids = this.serverFilter;
    this.filter.caids = this.driverFilter;
    this.filter.ctids = this.taskFilter;
    this.filter.labels = this.labelFilter;
    this.filterChange.emit(this.filter);
  }

  async computeLabelAfterTaskToggled() {
    if (this.taskFilter.length === 0) {
      this.labelRender = <string[]>this.allInfoData.labels;
    } else {
      this.labelRender = [];
      for (const item of this.allInfoData.labels) {
        let hasThisLabel = false;
        console.log(item);
        for (const subItem of this.taskRender) {
          if (this.taskFilter.includes(Number(subItem.ctid)) && subItem.label === item) {
            hasThisLabel = true;
            break;
          }
        }
        if (hasThisLabel) {
          this.labelRender.push(item as string);
        } else if (this.labelFilter.includes(item as string)) {
          this.labelFilter.splice(this.labelFilter.indexOf(item as string), 1);
        }
      }
    }
  }

  async computeTaskAfterDriverToggled() {
    if (this.driverFilter.length === 0) {
      this.taskRender = this.allInfoData.tasks;
    } else {
      this.taskRender = [];
      for (const item of this.allInfoData.tasks) {
        if (this.driverFilter.includes(Number(item.caid))) {
          this.taskRender.push(item);
        }
        if (!this.driverFilter.includes(item.caid) &&
          this.taskFilter.includes(Number(item.ctid))) {
          const index = this.taskFilter.indexOf(Number(item.ctid));
          this.taskDesHolder.splice(index, 1);
          this.taskFilter.splice(index, 1);
        }
      }
    }
  }

  async computeDriverAfterServerToggled() {
    if (this.serverFilter.length === 0) {
      this.driverRender = this.allInfoData.drivers;
    } else {
      this.driverRender = [];
      for (const item of this.allInfoData.drivers) {
        if (this.serverFilter.includes(item.csid)) {
          this.driverRender.push(item);
        }
        if (!this.serverFilter.includes(item.csid) &&
          this.driverFilter.includes(item.caid)) {
          const index = this.driverFilter.indexOf(item.caid);
          this.driverDesHolder.splice(index, 1);
          this.driverFilter.splice(index, 1);
        }
      }
    }
  }

  async getAllInfoData() {
    const res = await this.taskMonitorService.getAllInfo(this.isHistory);

    if (!res) {
      return;
    }
    this.allInfoData = res;
  }

  getFormatTime(date) {
    if (!date) {
      return 'YYYY/MM/DD';
    }
    return format(date, 'YYYY/MM/DD');
  }

}
