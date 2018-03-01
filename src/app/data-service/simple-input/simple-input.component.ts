import { Component, OnInit, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss']
})
export class SimpleInputComponent implements OnInit {

  @Input() type: 'string' | 'number' = 'string';

  constructor() { }

  value = null;
  data: any = null;
  inputType: 'text' | 'number' = null;

  ngOnInit() {
    this.type === 'string' ? (this.inputType = 'text') :
      (this.inputType = 'number');
  }

  valueChange() {
    this.data.inputValue = this.value;
  }

}
