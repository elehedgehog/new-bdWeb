import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-nav',
  templateUrl: './item-nav.component.html',
  styleUrls: ['./item-nav.component.scss']
})
export class ItemNavComponent implements OnInit {

  @Input() data: any;
  @Input() treeNodeIndex = 0;

  constructor() { }

  isSelected = false;

  ngOnInit() {
  }

}
