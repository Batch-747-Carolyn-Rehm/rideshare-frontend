import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number, format?: string): any {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor(value / 60) - (hours * 60);
    const seconds = value - (hours * 3600) - (minutes * 60);

    if (format) {
      let hoursString: string = "";
      let minutesString: string = "";
      let secondsString: string = "";

      switch (format) {
        case 'hours':
          return value / 3600;

        case 'minutes':
          return value / 60;

        case 'hh:mm:ss':
          if (hours === 0) hoursString = "00";
          else if (hours < 10) hoursString = `0${hours}`;

          if (minutes === 0) minutesString = "00";
          else if (minutes < 10) minutesString = `0${minutes}`;

          if (seconds === 0) secondsString = "00";
          else if (seconds < 10) secondsString = `0${seconds}`;

          return `${hoursString}:${minutesString}:${secondsString}`

        case 'full':
          if (hours > 1) hoursString = `${hours} hours`;
          else if (hours === 1) hoursString = `${hours} hour`

          if (minutes > 1) minutesString = `${minutes} minutes`;
          else if (minutes === 1) minutesString = `${minutes} minute`;

          if (seconds > 1) secondsString = `${seconds} seconds`;
          else if (seconds === 1) secondsString = `${seconds} second`;

          return `${hoursString} ${minutesString} ${secondsString}`;

        case 'short':
          if (hours > 1) hoursString = `${hours} hrs`;
          else if (hours === 1) hoursString = `${hours} hr`

          if (minutes > 1) minutesString = `${minutes} mins`;
          else if (minutes === 1) minutesString = `${minutes} min`;

          return `${hoursString} ${minutesString}`.trim();

        default:
          console.log(`Could not find a time format for: ${format}`)
      }
    }

    return { hours, minutes, seconds }
  }
}
