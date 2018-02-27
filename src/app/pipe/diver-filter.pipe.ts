import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diverFilter'
})
export class DiverFilterPipe implements PipeTransform {
  transform(value: any[], targetArgs: string[], valueArgs: number[]): any {
    console.log(value, targetArgs, valueArgs);
    if (valueArgs.length === 0) {
      return value;
    }

    const holder = value.filter(item => {
      let result = false;
      targetArgs.forEach(subItem => {
        result = valueArgs.includes(item[subItem]);
      });
      return result;
    });
    return holder;
  }
}
