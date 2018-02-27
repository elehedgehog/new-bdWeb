import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  @Input() selectData: SelectData[] = Array(3).fill({
    value: '123',
    viewValue: '21321',
    selected: false
  });

  constructor() { }

  isPopupShow = false;
  isSelectAll = false;

  ngOnInit() {
  }

  get getSelectedItemText() {
    const text = [];
    for (const item of this.selectData) {
      if (item.selected) {
        text.push(item.viewValue);
      }
    }
    return text.join('、');
  }

  selectOption(item: SelectData, isSelectAll?: boolean) {
    if (isSelectAll) {
      this.isSelectAll = !this.isSelectAll;
      for (const data of this.selectData) {
        data.selected = this.isSelectAll;
      }
      return;
    }

    item.selected = !item.selected;
  }

  closePopup($event) {
    $event.stopPropagation();
    this.isPopupShow = false;
  }
}

interface SelectData {
  value: string;
  viewValue: string;
  selected: boolean;
}
