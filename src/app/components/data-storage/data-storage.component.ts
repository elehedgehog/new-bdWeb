import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../service/data-storage.service';
import { MatDialog } from '@angular/material';
import { EventEmitter } from 'events';
import dataFormat from '../../util/dataFormat'
import echarts from 'echarts/lib/echarts';
import { format } from 'date-fns';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
@Component({
  selector: 'app-data-storage',
  templateUrl: './data-storage.component.html',
  styleUrls: ['./data-storage.component.scss']
})

export class DataStorageComponent implements OnInit {
  constructor(
    public dataStorageService: DataStorageService,
  ) { }
  async ngOnInit() {
    await this.getInfo()
    this.drawPie()
    await this.getSpace()
    await this.getServers()
    await this.getField()

  }
  scaleList: visit[] = [
    {
      key: 'percentsize',
      text: '容量比例',
      left: '12px',
    },
    {
      key: 'percentcount',
      text: '个数比例',
      left: '104px',
    },
  ]
  scaleLeft = 12
  scaleSelected: 'percentsize' | 'percentcount' = 'percentsize'
  dateContentSelected :string = null    //服务器数据信息
  dataContentPop: boolean = false       //数据信息弹框显示隐藏
  searchPop: boolean = false
  serverExtendHeight: string = ''; //服务器列表高度
  serverPop: boolean = false   //服务器名称列表伸缩
  typeInfosList: any = {}      //键值对/文件/格点 数据列表
  collectInfosList:any = {}    //集合列表
  collectInfos: any = {}       //集合
  legendList: any = []         //集合名称
  spaceList: any = []          // 总存储空间信息
  dataCounts: number = 0       //数据总个数
  dataTotalspace: string = ''  //数据总容量
  currentPage: number = 0      // 页数
  serverSelected: string = ''  //选中的服务器
  fieldList: any = []          //数据字段统计信息
  dataFormat: Function = dataFormat
  frameName:string = '' 
  mousePop: boolean = false 
  floatingWindowPercent: string = ''
  floatingWindowSize: string = ''
  floatingWindowName: string = ''
  floatingWindow: any = {
      'percentdbspace':'数据占用空间比例',
      'percentfreespace':'可用空间比例',
      'percentotherspace':'其他占用空间比例'
  }
  dataInList: statusPercent[] = [         //
      {	statusName:'key-value', percent: 30, time: 201709 },
      {	statusName:'grid-point', percent: 30, time: 201709 },
      {	statusName:'file', percent: 40, time: 201709 },
  ]
  stationList = [     //
      { 'station_id': 'G1000', 'name':'G1000', 'percent': '30', 'time': '0800'},
      { 'station_id': 'G1001', 'name':'G1000', 'percent': '30', 'time': '0800'},
      { 'station_id': 'G1002', 'name':'G1000', 'percent': '30', 'time': '0800'},
      { 'station_id': 'G1003', 'name':'G1000', 'percent': '30', 'time': '0800'},
      { 'station_id': 'G1004', 'name':'G1000', 'percent': '30', 'time': '0800'},
      { 'station_id': 'G1004', 'name':'G1000', 'percent': '30', 'time': '0800'},
      { 'station_id': 'G1004', 'name':'G1000', 'percent': '30', 'time': '0800'},
  ]
  
  dataOutList: statusPercent[] = [        //
    { statusName:'1', percent: 10, time: 201709 },
    { statusName:'2', percent: 8, time: 201709 },
    { statusName:'3', percent: 12, time: 201709 },
    { statusName:'4', percent: 11, time: 201709 },
    { statusName:'5', percent: 9, time: 201709 },
    { statusName:'6', percent: 10, time: 201709 },
    { statusName:'7', percent: 6, time: 201709 },
    { statusName:'8', percent: 20, time: 201709 },
    { statusName:'9', percent: 14, time: 201709 },
  ]
  dataInScale = {
    // 'key-value': { name: '键值对数据', color: '#407f88' },
    // 'grid-point': { name: '格点数据', color: '#4ebec4' },
    // 'file': { name: '文件数据', color: '#77d4d8' },
    'map': { name: '键值对数据', color: '#407f88' },
    'grid': { name: '格点数据', color: '#4ebec4' },
  }
  dataOutScale = {
    // '1': { name: 'syation_real1', color: '#00a0e9' },
    // '2': { name: 'syation_real2', color: '#f19149' },
    // '3': { name: 'syation_real3', color: '#f8d00f' },
    // '4': { name: 'syation_real4', color: '#f04f4f' },
    // '5': { name: 'syation_real5', color: '#7266ba' },
    // '6': { name: 'syation_real6', color: '#22ac43' },
    // '7': { name: 'syation_real7', color: '#f7896e' },
    // '8': { name: 'syation_real8', color: '#3fc4d3' },
    'gdalarm_real': { name: 'gdalarm_real', color: '#00a0e9' },
    'radar_real': { name: 'radar_real', color: '#f19149' },
    'satelite_real': { name: 'satelite_real', color: '#f8d00f' },
    'sea_weather_forecast': { name: 'sea_weather_forecast', color: '#f04f4f' },
    'station_real': { name: 'station_real', color: '#7266ba' },
    'swangrid_forecast': { name: 'swangrid_forecast', color: '#22ac43' },
    'model_forecast': { name: 'model_forecast', color: '#f7896e'}
  }
  serverList: any = []
  popupX: number = 0
  popupY: number = 0
  detailCollectname: string = ''
  detailId: string = ''
  detailList: any = []
  detailSelected: string = ''
  detailIndexList: any = []
  detailIndexId: string = ''
  detailIndexCollectName: string = ''
  detailIndexCurrentPage: number = 1
  detailInedxField: string = ''
  detailInedxFieldType: number = 2
  elements: string[] = []
  values: any = []
  fields: any = []
  pageSize: number = 8
  totalCount: number = 11
  valuesSelected: number = null 

  toggleScale(scale){
    if(this.scaleSelected === scale.key) return
    this.scaleLeft = scale.left
    this.scaleSelected = scale.key
    this.drawPie()
  }
  async toggleDataContent(item,key,name) {
    if(key === 'file') return
    if(this.dateContentSelected === key) return
    this.scaleSelected = key
    this.dataContentPop = !this.dataContentPop
    this.frameName = name
    this.detailCollectname = item.collectname
    this.detailId = item.id
    await this.getDetail()
  }
  async getInfo() { //获取数据比例信息接口
    const res = await this.dataStorageService.getInfo();
    if (!res) return 
    this.typeInfosList =  res.typeInfos
    this.collectInfosList  = res.collectInfos
    for(let item of res.typeInfos){
        this.legendList.push(item.name)
    }
    for(let item of res.collectInfos){
        this.legendList.push(item.name)
    }
  }
  drawPie() {          //绘制图表
    const dataIn = [],
          dataOut = []
        //   for (const el of this.dataInList) {
        //     dataIn.push({
        //         value: el.percent,
        //         name: this.dataInScale[el.statusName].name,
        //         itemStyle: { normal: { color: this.dataInScale[el.statusName].color } }
        //     });
        //   }
        //   for (const el of this.dataOutList) {
        //     if (!this.dataOutScale[el.statusName]) continue
        //     dataOut.push({
        //         value: el.percent,
        //         name: this.dataOutScale[el.statusName].name,
        //         itemStyle: { normal: { color: this.dataOutScale[el.statusName].color } }
        //     });
        //   }
            for (const el of this.typeInfosList) {
                dataIn.push({
                    value: el[this.scaleSelected],
                    name: el.name,
                    itemStyle: { normal: { color: this.dataInScale[el.name].color } }
                });
            }
            for (const el of this.collectInfosList) {
                dataOut.push({
                    value: el[this.scaleSelected],
                    name: el.name,
                    itemStyle: { normal: { color: this.dataOutScale[el.name] ? this.dataOutScale[el.name].color : '#3fc4d3' } }
                });
            }
    const myChart = echarts.init(document.getElementById('dataScale'));
    const option = {
        tooltip: {
            trigger: 'item',
            // formatter: "{b}<br/>{c} ({d}%)",
            formatter: "<span style='font-weight: bold'>{b}<br/><span style='color:#407F88'>{d}%</span><span>",
            backgroundColor:'rgba(0,0,0,0.7)',
            textStyle: {
                color: '#7895ce',
            }
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'top',
            align: 'left',
            itemWidth: 12,
            itemHeight: 12,
            textStyle: {
              color: '#7895ce',
            },
            // data:['键值对数据','格点数据','文件数据','syation_real1','syation_real2','syation_real3','syation_real4','syation_real5','syation_real6','syation_real7','syation_real8'],
            data: this.legendList,
        },
        series: [
            {
                type:'pie',
                selectedMode: 'single',
                radius: [0, '31%'],

                label: {
                    normal: {
                        position: 'inner',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    }
                },
                data: dataIn
            },
            {
                type:'pie',
                radius: ['30%', '55%'],
                label: {
                    normal: {
                        // formatter: "{b}: {c} ({d}%)",
                        formatter: function(param) {
                            return Math.round(param.value*100)/100 + '%'
                        },
                        textStyle: {
                            color: '#7895ce',
                        },
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#7895ce',
                        },
                        textStyle: {
                            color: '#7895ce',
                        },
                    }
                },
                data: dataOut
            }
        ]
    };
    myChart.setOption(option);
  }

  async getSpace(){
    const res = await this.dataStorageService.getSpace();
    if (!res)  return
    // for (let i = 0; i < 24; i++) {
    //     res.push(res[0])
    // }
    this.spaceList= []
    for (let i = 1; i <= Math.ceil(res.length / 10); i++) {
        this.spaceList.push(res.slice((i-1)*10, i*10))
    }
    let dataTotalspace = 0
    for(let item of res){
        this.dataCounts += item.datacount
        dataTotalspace += item.totalspace
    }
    this.dataTotalspace = dataFormat(dataTotalspace)
  }
  
  togglePage(page) {
    if (this.currentPage !== page)
        this.currentPage = page
  }

  async getServers() {  //获取所有不同服务器接口
    const res = await this.dataStorageService.getServers();
    if (!res)  return
    this.serverList = res
    this.serverExtendHeight = 52.5 * Math.ceil((1 + this.serverList.length) / 10) + 17.5 + 'px';
  }
  async getField() {  //获取数据字段详细信息接口
    const res = await this.dataStorageService.getField(this.serverSelected);
    if (!res)  return
    this.fieldList = res
  }
  async toggleServer(key) {   //选择服务器
    if(this.serverSelected === key) return
        this.serverSelected = key
    await this.getField()
  }
  getTimeText(date: number) {
    return format(date, 'MM-DD HH:mm');
  }

  mouseOverClick(key,item){   //鼠标移入
    let event = window.event || arguments.callee.caller.arguments[0]
    this.popupX = event.clientX
    this.popupY = event.clientY

    this.mousePop = true
    this.floatingWindowName = this.floatingWindow[key]
    if(key === 'percentdbspace'){
        this.floatingWindowPercent = Math.round(item.percentdbspace*100)/100 + '%'
        this.floatingWindowSize = dataFormat(item.dbspace)
    } else if(key === 'percentfreespace'){
        this.floatingWindowPercent = Math.round(item.percentfreespace*100)/100 + '%'
        this.floatingWindowSize = dataFormat(item.freespace)
    } else {
        this.floatingWindowPercent = Math.round(item.percentotherspace*100)/100 + '%'
        this.floatingWindowSize = dataFormat(item.otherspace)
    }
  }
  mouseOutClick(key,item){  //鼠标移出
    this.mousePop = false
  }

  async getDetail() {    
    const res = await this.dataStorageService.getDetail(this.detailId,this.detailCollectname);
    if (!res)  return
    this.detailList = res
    this.toggleSearch(res[0])

  }
  async getIndexDetail() { //获取数据字段二级详细信息接口
    const res = await this.dataStorageService.getIndexDetail(this.detailIndexId,this.detailIndexCollectName,this.detailIndexCurrentPage,this.pageSize,this.detailInedxField,this.detailInedxFieldType);
    if (!res)  return
    this.detailIndexList = res
    this.elements = this.detailIndexList.obj.elements
    this.values = this.detailIndexList.obj.values
    let fields = this.detailIndexList.obj.fields
    for (let el of fields) {
        el.map((string, index, self) => {
            self[index] = string.trim()
        })
    }
    this.fields = fields
    // this.fields = [['cols', 'level']]
  }

  async toggleSearch(item){  //左栏数据字段详细信息列表点击事件
    this.valuesSelected = null
    this.detailIndexId = item.id
    this.detailIndexCollectName = item.collectname
    this.detailInedxField = item.field
    this.detailInedxFieldType = item.fieldtype
    await this.getIndexDetail()
    if(this.detailSelected === item.field) return
    this.detailSelected = item.field
  }

  toggleValue(i) {   //右栏点击选中
    if(this.valuesSelected === i) this.valuesSelected = null
    else this.valuesSelected = i
  }
  async downPage(){  //向上翻页
    if(this.detailIndexCurrentPage === 1) return
    this.detailIndexCurrentPage--
    await this.getIndexDetail()

  }
  async upPage(){  //向下翻页
    if(this.values.length < 8) return
    this.detailIndexCurrentPage++
    await this.getIndexDetail()
  }


}
 