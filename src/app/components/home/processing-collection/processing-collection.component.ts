import { Component, OnInit, DoCheck, Input } from '@angular/core';
import echarts from 'echarts/lib/echarts';
import { HomeService } from '../../../service/home.service';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import { format } from 'date-fns';
@Component({
    selector: 'app-processing-collection',
    templateUrl: './processing-collection.component.html',
    styleUrls: ['./processing-collection.component.scss']
})
export class ProcessingCollectionComponent implements OnInit {
	constructor(
		public homeService: HomeService
	) { }
	@Input()
	label = 'all';
	currentLabel = 'all';
	@Input()
	quaSelected = 'real'
	currentQuaSelected = 'real'
	historyTime = []
	interval: number = 5
	dataSize = 50
	dataResultNumList = []
	dataResultSizeList = []
	timeList = []
	timeObj = {}

	async ngOnInit() {
		this.getHistoryData()
		this.drawLine()
	}
	async drawLine() {
			const myChart = echarts.init(document.getElementById('processingCollection'));
			const colors = ['#9a80fb', '#48d8fc', '#4d6fb4'];
			const option = {
					color: colors,
					tooltip: {
							trigger: 'axis',
							axisPointer: {
									type: 'cross',
							},
							backgroundColor: 'rgba(3,21,61,0.8)',
							textStyle:{
								color: '#4d6fb4'
							},
							formatter: params => {
								return `
									<span>${this.timeObj[params[0].axisValue]}</span>
									<br>
									${params[0].seriesName}：<span style="color: ${colors[0]}">${params[0].data}</span>
									<br>
									${params[1].seriesName}：<span style="color: ${colors[1]}">${params[1].data}</span>
								`
							}
					},
					legend: {
							//   x: 'center',
							//   y: 'bottom',
							data: [
									{ name: '采集数据个数', textStyle: { color: '#9a80fb' }, },
									{ name: '采集数据大小', textStyle: { color: '#48d8fc' }, },
							]
					},
					grid: { top: 70, bottom: 50	},
					xAxis: [
							{
									type: 'category',
									axisLine: {
											show: true,
											lineStyle: {
													color: '#4d6fb4',
											}
									},
									axisTick: {
											show: true,
											alignWithLabel: true,
											length: 8,
											lineStyle: {
													color: '#2a4d92',
											}
									},
									splitLine: {
											show: false,
											lineStyle: {
													color: '#2a4d92',
											},
									},
									data: this.timeList
							}
					],
					yAxis: [
							{
									name: '采集数据个数',
									nameLocation: 'center',
									nameGap: 60,
									type: 'value',
									axisTick: {
											show: false,
									},
									axisLine: {
											show: false,
											//   onZero: false,
											lineStyle: {
													color: colors[0]
											}
									},
									splitLine: {
										show: true,
										lineStyle: {
												color: 'rgba(154,128,251,0.3)',
											},
									},
									axisPointer: {
											label: {
													formatter: function (params) {
															return '采集数据个数  ' + Math.floor(params.value*100)/100
													}
											}
									}
							},
							{
									name: '采集数据大小',
									nameLocation: 'center',
									nameRotate: '270',
									nameGap: 70,
									type: 'value',
									axisTick: {
											show: false,
									},
									axisLine: {
											show: false,
											lineStyle: {
													color: colors[1]
											}
									},
									splitLine: {
											show: true,
											lineStyle: {
													color: '#2a4d92',
											},
									},
									axisPointer: {
											label: {
													formatter: function (params) {
															return '采集数据大小  ' + Math.floor(params.value*100)/100
													}
											}
									},
									axisLabel: {
										formatter: function (value) {
											let unit = 'B';
											if( value > 1024) {
												value = value / 1024;
												unit = 'KB';
											}
											if( value > 1024) {
												 value = value / 1024;
												unit = 'MB';
											}
											if( value > 1024) {
												 value = value / 1024;
												unit = 'GB';
											}
											if( value > 1024) {
												 value = value / 1024;
												unit = 'TB';
											}
											 value = Math.round( value * 100) / 100;
											return value + unit;
										},
									},
							}
					],
					series: [
							{
									name: '采集数据个数',
									type: 'line',
									yAxisIndex: 0,
									smooth: true,
									data: this.dataResultNumList
							},
							{
								name: '采集数据大小',
								type: 'line',
								yAxisIndex: 1,
								smooth: true,
								data: this.dataResultSizeList
						},
					]
			};
			myChart.setOption(option);
	}
	async getHistoryContinue() { //任务历史结果数量与大小画实时曲线图接口
		const res = await this.homeService.getHistoryContinue(this.interval,this.dataSize,this.currentLabel !== 'all' ? this.currentLabel : '');
		if (!res) return
		this.historyTime = res.chs
		console.log(this.historyTime)
	}
	async getHistoryTime() {  //年月日小时间隔获取任务结果接口
		const res = await this.homeService.getHistoryTime(this.currentQuaSelected !== 'real' ? this.currentQuaSelected : '',this.currentLabel !== 'all' ? this.currentLabel : '')
		if (!res) return
		this.historyTime = res.chs
		
		console.log(this.historyTime)
	}
	async getHistoryData() {
		this.dataResultNumList = []
		this.dataResultSizeList = []
		this.timeList = []
		this.timeObj = {}
		console.log(this.quaSelected)
		if(this.quaSelected == 'real') {
			await this.getHistoryContinue()
		} else {
			await this.getHistoryTime()
		}
		for(let item of this.historyTime) {
			this.dataResultNumList.push(item.dataResultNum)
			this.dataResultSizeList.push(item.dataResultSize)
			this.timeList.push(format(item.time, 'HH:mm'))
			this.timeObj[format(item.time, 'HH:mm')] = format(item.time, 'YYYY年MM月DD日 HH时mm分')
		}
	}
	async ngDoCheck() { //监听
		if (this.label !== this.currentLabel) {    
				this.currentLabel = this.label;
				await this.getHistoryData();
				this.drawLine()
		}
		if(this.quaSelected !== this.currentQuaSelected) {
			this.currentQuaSelected = this.quaSelected
			await this.getHistoryData()
			this.drawLine()
		}
	}

}
