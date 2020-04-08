import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToMiles'
})
export class MetersToMilesPipe implements PipeTransform {

  transform(value: number): any {
    let miles: number = value * 0.000621371192;

    return parseFloat(`${miles}`).toFixed(1);
  }
}
