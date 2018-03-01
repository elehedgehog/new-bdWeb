import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-item-nav',
  templateUrl: './item-nav.component.html',
  styleUrls: ['./item-nav.component.scss']
})
export class ItemNavComponent implements OnInit {

  @Input() data: any;
  @Input() treeNodeIndex = 0;

  constructor(
    public dataService: DataServiceService
  ) { }

  ngOnInit() {
  }

  selectItem() {
    this.dataService.selectedItemKey = this.data.url;
    this.dataService.argsData = JSON.parse(this.data.args);
    this.dataService.des = this.data.cname;
  }

}
