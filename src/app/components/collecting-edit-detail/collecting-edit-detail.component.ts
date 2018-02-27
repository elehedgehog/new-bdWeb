import { Component, OnInit, Input } from '@angular/core';
import { Zh } from '../../class/zh';

@Component({
  selector: 'app-collecting-edit-detail',
  templateUrl: './collecting-edit-detail.component.html',
  styleUrls: ['./collecting-edit-detail.component.scss']
})
export class CollectingEditDetailComponent implements OnInit {
  @Input()
  public data: AllInfo__Task
  @Input()  
  isDialog: boolean

  constructor(
    // @Inject(forwardRef(()=>ParentComponent)) public data: AllInfo__Task
  ) {
  }

  zh = Zh;
  isShowLabelPanel = false;

  ngOnInit() {
    console.log(this.data)
  }
}
