export const timeFormatSeconds = (time: any, type = 'default') => {
  const d = time ? new Date(time) : new Date();
  const year: any = d.getFullYear();
  let month: any = d.getMonth() + 1;
  let day: any = d.getDate();
  let hours: any = d.getHours();
  let min: any = d.getMinutes();
  let seconds: any = d.getSeconds();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  if (hours < 0) hours = '0' + hours;
  if (min < 10) min = '0' + min;
  if (seconds < 10) seconds = '0' + seconds;

  let targetValue = '';

  switch (type) {
    case 'default':
      targetValue = year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds;
      break;

    case 'history':
      targetValue = day + '-' + month + ' ' + hours + ':' + min;
      break;

    case 'monthDay':
      targetValue = month + day;
      break;

    case 'buildDay':
      targetValue = '.MA' + (year % 100) + month + day;
      break;
  }

  return targetValue;
};
