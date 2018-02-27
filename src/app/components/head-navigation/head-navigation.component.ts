import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head-navigation',
  templateUrl: './head-navigation.component.html',
  styleUrls: ['./head-navigation.component.scss']
})
export class HeadNavigationComponent implements OnInit {

  constructor() { }

  isShowDataCollectingSubMenu = false;

  ngOnInit() {
  }

  toggleDataCollectingSubMenu(action) {
    this.isShowDataCollectingSubMenu = action;
  }

}
