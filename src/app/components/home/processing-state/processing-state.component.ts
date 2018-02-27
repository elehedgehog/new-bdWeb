import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { HomeService } from '../../../service/home.service';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

@Component({
    selector: 'app-processing-state',
    templateUrl: './processing-state.component.html',
    styleUrls: ['./processing-state.component.scss']
})

export class ProcessingStateComponent implements OnInit, DoCheck {
    constructor(
        public homeService: HomeService
    ) { }
    @Input()
    label = 'all';
    currentLabel = 'all';
    statusList: statusPercent[] = [];
    status = {
        'complete': { name: '成功', color: '#7ac8e9' },
        'result_incomplete': { name: '数据源缺失', color: '#338ee5' },
        'source_incomplete': { name: '处理结果缺失', color: '#5558d2' },
        'deadline_exceeded': { name: '超过期限', color: '#aac1ca' },
    };
    async ngOnInit() {
        await this.getPercent();
        this.drawPipe();
    }
    drawPipe() {         // 绘制饼图
        const data = [];
        for (const el of this.statusList) {
            if (!this.status[el.statusName]) continue
            data.push({
                value: el.percent,
                name: this.status[el.statusName].name,
                itemStyle: { normal: { color: this.status[el.statusName].color } }
            });
        }

        const myChart = echarts.init(document.getElementById('processingState'));
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}%'
            },
            legend: {
                x: 'center',
                y: 'bottom',
                itemWidth: 12,
                itemHeight: 12,
                inactiveColor: '#4d6fb4',
                textStyle: { color: '#82aaf8', fontSize: 14 },
                data: ['成功', '数据源缺失', '处理结果缺失', '超过期限']
            },
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: '全局任务状态',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: data,
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
    async getPercent(label?: string) {       // 获取最近24小时任务结果状态百分比
        const res = await this.homeService.getPercent(label);
        if (!res) {
            return;
        }
        this.statusList = res;
    }
    async ngDoCheck() {
        if (this.label !== this.currentLabel) {
            this.currentLabel = this.label;
            if (this.currentLabel === 'all') {
                await this.getPercent();
            } else {
                await this.getPercent(this.currentLabel);
            }
            this.drawPipe();
        }
    }
}
