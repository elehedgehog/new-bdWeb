import { Component, OnInit, DoCheck, Input } from '@angular/core';
import echarts from 'echarts/lib/echarts';
import { HomeService } from '../../../service/home.service';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';

@Component({
    selector: 'app-processing-statistics',
    templateUrl: './processing-statistics.component.html',
    styleUrls: ['./processing-statistics.component.scss']
})
export class ProcessingStatisticsComponent implements OnInit {
    constructor(
		public homeService: HomeService
	) { }
  @Input()
	label = 'all';
	currentLabel = 'all';
	historyTotal = []
	applicationList = []
	dataResultNumList = []
	dataResultSizeList = []
	sortPop: boolean = false
	@Input()
	visiQuantitySelected = 'day'
	currentQuaSelected = 'day'
	dataSize = 50
	order: '' | 'size' | 'num' = 'size'
	async ngOnInit() {
		await this.getNtasksHistory()
		this.drawBar()
	}
	async toggleSortWay(key) {
		this.order = key
		await this.getNtasksHistory()
		this.drawBar()
	}
	drawBar() {
		const myChart = echarts.init(document.getElementById('ProcessingStatistics'));
		const option = {
				tooltip: {
						trigger: 'axis',
						axisPointer: {
								type: 'shadow'
						}
				},
				legend: {
						// x: 'center',
						// y: 'bottom',
						textStyle: {
								color: '#fff',
						},
						data: [
								{ name: '数据量', textStyle: { color: '#9F86FF' }, },
								{ name: '请求量', textStyle: { color: '#48D8FC' }, },
						]
				},
				grid: {
						left: '3%',
						right: '4%',
						bottom: '8%',
						containLabel: true
				},
				xAxis: [
					{
						type: 'value',
						name: '数据量(万)',
						nameLocation: 'start',
						// boundaryGap: [0, 0.01],
						splitLine: {
								show: true,
								lineStyle: {
									color: 'rgba(154,128,251,0.3)',
								},
						},
						axisLine: {
								show: false,
								//   onZero: false,
								lineStyle: {
										color: '#9F86FF',
								}
						},
						axisTick: {
								show: false,
								alignWithLabel: true,
								lineStyle: {
										color: '#2a4d92',
								}
						},

				}, {
						type: 'value',
						name: '请求量(M)',
						nameLocation: 'start',
						// boundaryGap: [0, 0.01],
						splitLine: {
								show: true,
								lineStyle: {
										color: '#2a4d92',
								},
						},
						axisLine: {
								show: false,
								//   onZero: false,
								lineStyle: {
										color: '#48D8FC',
								}
						},
						axisTick: {
								show: false,
								alignWithLabel: true,
								lineStyle: {
										color: '#2a4d92',
								}
						},
				}
				],
				yAxis: {
						type: 'category',
						nameTextStyle: {
								color: '9a80fb',
						},
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
						data: this.applicationList,
				},
				series: [
						{
								name: '数据量',
								type: 'bar',
								data: this.dataResultNumList,
								xAxisIndex: 0,
								itemStyle: {
										normal: {
												color: '#9F86FF',
										}
								}
						},
						{
								name: '请求量',
								type: 'bar',
								data: this.dataResultSizeList,
								xAxisIndex: 1,
								itemStyle: {
										normal: {
												color: '#48D8FC',
										}
								}
						}
				]
		};
		myChart.setOption(option);
	}
	async getNtasksHistory() {
		const res = await this.homeService.getNtasksHistory(this.dataSize,this.visiQuantitySelected,this.currentLabel !== 'all' ? this.currentLabel : '',this.order)
		if (!res) return
		this.historyTotal = res
		this.applicationList = []
		this.dataResultNumList = []
		this.dataResultSizeList = []
		for(let item of this.historyTotal) {
			this.applicationList.push(item.ct.name) 
			this.dataResultNumList.push(item.dataResultNum)
			this.dataResultSizeList.push(item.dataResultSize)
		}
		console.log(this.applicationList)
	}
	async ngDoCheck() { //监听
		if (this.label !== this.currentLabel) {    
				this.currentLabel = this.label;
				await this.getNtasksHistory();
				this.drawBar()
		}
		if(this.visiQuantitySelected !== this.currentQuaSelected) {
			this.currentQuaSelected = this.visiQuantitySelected
			await this.getNtasksHistory()
			this.drawBar()
		}
	}
}
