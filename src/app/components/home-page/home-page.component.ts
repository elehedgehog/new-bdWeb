import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomePageService } from '../../service/home-page.service';
import Stomp from 'stompjs';
import { format } from 'date-fns';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(
    public homePageService: HomePageService
  ) { }
  historyRecordPop: boolean = false
  collectList: any = [
    {status: 'error',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'normal',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'normal',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'normal',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'error',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'normal',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'normal',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'normal',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'error',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'normal',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'normal',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'normal',title: '分片复制集',ip: '10.148.83.4:27017'},
    {status: 'normal',title: '分片复制集',ip: '10.148.83.4:27017'},
  ]
  statusList: any = [
    {icon: 'warn',status: '警告',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'warn',status: '警告',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'error',status: '失败',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'error',status: '失败',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'error',status: '失败',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'warn',status: '警告',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'error',status: '失败',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'warn',status: '警告',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'warn',status: '警告',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'warn',status: '警告',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'error',status: '失败',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'error',status: '失败',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'error',status: '失败',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
    {icon: 'error',status: '失败',time:'2017-12-13',server: 'CHxxx',cause: '失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因' },
  ]
  ngOnInit() {
    
  }
  ngOnDestroy(){

  }
  
}