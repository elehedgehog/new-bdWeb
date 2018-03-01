import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'app-data-service',
  templateUrl: './data-service.component.html',
  styleUrls: ['./data-service.component.scss']
})
export class DataServiceComponent implements OnInit {

  constructor(
    public dataService: DataServiceService,
    public dialogService: DialogService
  ) { }

  serverData = null;
  searchTimeOutHolder = null;
  searchValue = '';
  requlstBodyExpanded = false;
  jsonData: any = {
    test: 123213
  };

  get requestWindowExpandedWidth() {
    const windowWidth = document.body.clientWidth;
    if (windowWidth >= 1320) {
      return (windowWidth - 1320) / 2 - 300 + 1320;
    } else {
      return 1320 - 300;
    }
  }

  async ngOnInit() {
    if (this.dataService.serverData.length === 0) {
      await this.dataService.getServerData();
    }
    this.serverData = this.dataService.serverData;
  }


  submit() {
    console.log('ahahahhaa');
    let haveAllArgsData = true;
    for (const item of this.dataService.argsData) {
      if (!item.inputValue) {
        haveAllArgsData = false;
        item.error = true;
      }
    }
    console.log(haveAllArgsData);
    if (!haveAllArgsData) {
      this.dialogService.displayTip('warn', '参数还未输入完整');
      return;
    }
  }

  search() {
    if (this.searchTimeOutHolder) {
      clearTimeout(this.searchTimeOutHolder);
    }
    this.searchTimeOutHolder = setTimeout(() => {
      this.dataService.search(this.searchValue);
      this.searchTimeOutHolder = null;
    }, 200);
  }
}
