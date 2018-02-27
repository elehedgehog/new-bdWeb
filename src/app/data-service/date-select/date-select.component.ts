import { Component, OnInit } from '@angular/core';
import { Zh } from '../../class/zh';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit {

  constructor() { }

  selectData = [
    { value: 12321, viewValue: 21312, selected: false }
  ];
  zh = Zh;
  isPopupShow = false;

  ngOnInit() {
  }

}
