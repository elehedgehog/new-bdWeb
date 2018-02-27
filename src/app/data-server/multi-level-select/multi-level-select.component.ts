import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multi-level-select',
  templateUrl: './multi-level-select.component.html',
  styleUrls: ['./multi-level-select.component.scss']
})
export class MultiLevelSelectComponent implements OnInit {

  @Input() type: 'string' | 'number' = 'string';

  constructor() { }

  value = null;
  inputType: 'text' | 'number' = null;
  selectData = [];

  ngOnInit() {
    this.type === 'string' ? (this.inputType = 'text') :
      (this.inputType = 'number');
  }

  closePopup(event?: any) {

  }

}
