import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent implements OnInit {
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
    item.selected = !item.selected;
    this.isPopupShow = false;
  }

  closePopup($event) {
    this.isPopupShow = false;
  }
}

interface SelectData {
  value: string;
  viewValue: string;
  selected: boolean;
}
