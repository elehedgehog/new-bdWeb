import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../../service/home.service';
import Stomp from 'stompjs';
import { format } from 'date-fns';

let client

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    public homeService: HomeService
  ) { }

  visitDmyQua: visit[] = [
    {
      key: 'real',
      text: '实时采集量',
      left: '76px',
    },
    {
      key: 'day',
      text: '本日各小时采集量',
      left: '276px',
    },
    {
      key: 'month',
      text: '本月每日采集量',
      left: '476px',
    },
    {
      key: 'year',
      text: '本年每月采集量',
      left: '676px',
    },
    {
      key: 'years',
      text: '近年采集量',
      left: '876px',
    }
  ];
  visitDmyQuaSelected: 'real' | 'day' | 'month' | 'year' | 'latest' = 'real';
  visitDmyLeft = 76;
  visiQuantity: quantity[] = [
    {
      key: 'day',
      text: '本日各小时采集量',
      left: '76px',
    },
    {
      key: 'month',
      text: '本月每日采集量',
      left: '276px',
    },
    {
      key: 'year',
      text: '本年每月采集量',
      left: '476px',
    },
    {
      key: 'years',
      text: '近年采集量',
      left: '676px',
    }
  ];
  quantityLeft = 76;
  visiQuantitySelected: 'day' | 'month' | 'year' | 'years' = 'day';

  processingNotice: notice[] = [
    {
      key: '1',
      text: 'adagka',
      date: '2018/01/01 13:45',
      state: '失败'
    },
    {
      key: '2',
      text: 'adagka',
      date: '2018/01/01 13:45',
      state: '失败'
    },
    {
      key: '3',
      text: 'adagka',
      date: '2018/01/01 13:45',
      state: '失败'
    },
    {
      key: '4',
      text: 'adagka',
      date: '2018/01/01 13:45',
      state: '失败'
    },
  ]
  noticeSelected: '1' | '2' | '3' | '4' | '5' = '1';
  navPop: boolean = false;
  labelsList: string[] = []
  labelsListSelected: 'all' | number = 'all';
  navExtendHeight: string = '';
  errorInfo: any = {
    first: {},
    second: {},
    thrid: {}
  };
  errorDetail: any = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} };
  errorNumber: number = 0;
  hasError: boolean = false;


  ngOnInit() {
    this.getLabels();
    this.initWebSocket();
  }

  ngOnDestroy() {
    client.disconnect()
  }

  toggleDmy(visitDmy) {
    if (this.visitDmyQuaSelected === visitDmy.key) {
      return;
    }

    this.visitDmyLeft = visitDmy.left;
    this.visitDmyQuaSelected = visitDmy.key;
  }
  toggleQua(quantity) {
    if (this.visiQuantitySelected === quantity.key) {
      return;
    }
    this.quantityLeft = quantity.left;
    this.visiQuantitySelected = quantity.key;
  }
  toggleDataType(key) {
    this.labelsListSelected = key;
  }
  async getLabels() {     // 获取不同任务标签
    const res = await this.homeService.getLabels();
    if (!res) {
      return;
    }
    this.labelsList = res;
    this.navExtendHeight = 52.5 * Math.ceil((1 + this.labelsList.length) / 10) + 17.5 + 'px';
  }

  // websocket
  initWebSocket() {              // 客户端实时接收错误任务信息
    let url = 'http://10.148.83.221:10190/bigdata/ws'
    let ws = new window['SockJS'](url)
    client = Stomp.over(ws)
    client.connect({}, frame => {
      client.subscribe('/client/error', message => {
        let msg: clientError = JSON.parse(message.body)
        msg.time = format(msg.time, 'YYYY/MM/DD HH:mm:ss')
        for (let el of msg.errors) {
          this.showErrorTip({
            fileName: el.fileName,
            message: el.message,
            time: msg.time
          })
        }
      })
    })
  }
  showErrorTip(msg) {
    this.hasError = true
    if (this.errorNumber === 6)
      this.errorNumber = 4
    else
      this.errorNumber ++
    this.errorDetail[this.errorNumber] = msg
    let label
    if (this.errorNumber === 1 || this.errorNumber === 4)
      label = 'first'
    else if (this.errorNumber === 2 || this.errorNumber === 5)
      label = 'second'
    else if (this.errorNumber === 3 || this.errorNumber === 6)
      label = 'thrid'
    let isFirst
    if (this.errorNumber === 1 || this.errorNumber === 2 || this.errorNumber === 3)
      isFirst = true
    else
      isFirst = false

    let element = <HTMLDivElement>document.querySelector('#error-' + label)
    this.errorInfo[label] = {}
    element.style.visibility = 'visible'
    element.style.top = isFirst ? '0' : '-60px'
    setTimeout(() => {
      element.style.visibility = 'hidden'
      if (!isFirst) {
        element.style.top = '0'
        this.errorDetail[this.errorNumber - 3] = msg
      }
      this.errorInfo[label] = msg
    }, 1000)
  }


}
