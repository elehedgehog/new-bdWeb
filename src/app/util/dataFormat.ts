export default function (value) {
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
}