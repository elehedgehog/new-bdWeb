import * as zh from 'date-fns/locale/zh_cn';

export class Zh {
  firstDayOfWeek: 1;
  dayNames: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  dayNamesShort: ['一', '二', '三', '四', '五', '六', '七'];
  monthNames: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ];
  monthNamesShort: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ];
  dateFns = zh;
}
