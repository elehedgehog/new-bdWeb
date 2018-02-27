export class HomeProgressBarDrawer {
  constructor(canvasId: string, data: number[][]) {
    this.cts = (<HTMLCanvasElement>document.querySelector('#' + canvasId)).getContext('2d');
    this.data = data;
  }

  cts: CanvasRenderingContext2D = null;
  successColor = '#48d8fc';
  missingColor = '#0d8efb';
  errorColor = '#7959ef';
  data: number[][] = null;

  draw() {
    let start = 0;
    for (const item of this.data) {
      const color = item[0] === 0 ? this.successColor :
        item[0] === 2 ? this.errorColor : this.missingColor;
      this.cts.fillStyle = color;
      this.cts.fillRect(start, 0, item.length, 6);
      start = item.length + 1;
    }
    return this.cts.canvas.toDataURL();
  }

  changeData(canvasId: string, data: number[][]) {
    this.cts = (<HTMLCanvasElement>document.querySelector('#' + canvasId)).getContext('2d');
    this.data = data;
  }
}
