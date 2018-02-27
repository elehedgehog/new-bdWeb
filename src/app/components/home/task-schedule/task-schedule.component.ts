import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { HomeService } from '../../../service/home.service';

@Component({
  selector: 'app-task-schedule',
  templateUrl: './task-schedule.component.html',
  styleUrls: ['./task-schedule.component.scss']
})
export class TaskScheduleComponent implements OnInit {
  constructor(
    public homeService: HomeService
  ) { }
  @Input()
	label = 'all';
  currentLabel = 'all';
  tasksScheduleList = []
  status = { 'running': '正在运行', 'finished': '完成', 'stopped': '结束' , 'fatal': '错误'}
  nodeSize = 1
  async ngOnInit() {
    await this.getTasksSchedule()
  }
  async getTasksSchedule() {
    const res = await this.homeService.getTasksSchedule(this.nodeSize, this.currentLabel !== 'all' ? this.currentLabel : '')
    if(!res) return
    if(res.length > 10) res.splice(10)
    this.tasksScheduleList = res
    console.log(this.tasksScheduleList)
  }
  async ngDoCheck() { //监听
		if (this.label !== this.currentLabel) {    
				this.currentLabel = this.label;
				await this.getTasksSchedule();
    }
  }
}


