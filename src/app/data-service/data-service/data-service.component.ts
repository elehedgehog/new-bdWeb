import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-service',
  templateUrl: './data-service.component.html',
  styleUrls: ['./data-service.component.scss']
})
export class DataServiceComponent implements OnInit {

  constructor() { }

  testNavData = [
    {
      type: 'group', text: 'group', sub: [
        {
          type: 'item', data: {
            text: 1231231232131231
          }
        },
        {
          type: 'group', text: 'group', sub: [
            {
              type: 'item', data: {
                text: 1231231232131231
              }
            }
          ]
        }
      ]
    },
    /*     {
          type: 'group', text: 123213, sub: [
            {
              type: 'item', data: {
                text: 1231231232131231
              }
            }
          ]
        },
        {
          type: 'group', text: 123213, sub: [
            {
              type: 'group', text: 123213, sub: [
                {
                  type: 'item', data: {
                    text: 1231231232131231
                  }
                }
              ]
            },
            {
              type: 'group', text: 123213, sub: [
                {
                  type: 'item', data: {
                    text: 1231231232131231
                  }
                }
              ]
            },
          ]
        }, */
  ];

  ngOnInit() {
  }

}
