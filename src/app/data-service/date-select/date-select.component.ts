import { Component, OnInit, Input } from '@angular/core';
import { Zh } from '../../class/zh';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit {


  constructor() { }

  hourSelectData = [
  ];
  minuteSelectData = [
  ];
  hourSelected = null;
  minuteSelected = null;
  hourInterval = 5;
  minuteInterval = 5;
  data: any = null;
  zh = Zh;
  isHourPopupShow = false;
  isMinutePopupShow = false;

  ngOnInit() {
    if (this.data.hourInterval) {
      this.hourInterval = this.data.hourInterval;
    }
    if (this.data.minuteInterval) {
      this.minuteInterval = this.data.minuteInterval;
    }
    this.computeSelectData();
  }

  selectOption(item, type: 'hour' | 'minute') {
    if (type === 'hour') {
      this.hourSelectData.forEach(data => {
        data.selected = false;
      });
      this.hourSelected = item.value;
      this.isHourPopupShow = false;
    } else {
      this.minuteSelectData.forEach(data => {
        data.selected = false;
      });
      this.minuteSelected = item.value;
      this.isMinutePopupShow = false;
    }

    item.selected = true;
  }


  computeSelectData() {
    for (let i = 0; i < 60; i += this.hourInterval) {
      this.hourSelectData.push({
        value: i, viewValue: i, selected: false
      });
    }
    for (let i = 0; i < 60; i += this.minuteInterval) {
      this.minuteSelectData.push({
        value: i, viewValue: i, selected: false
      });
    }
  }

}
