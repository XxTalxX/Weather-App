import { Injectable, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TempOrMaxTempOrMinTemp } from './main/city-display/days-list/weather.model';

// function instanceOfTemp(object: any): object is TempOrMaxTempOrMinTemp {
//   return 'c' in object;
// }

@Injectable()
@Pipe({
  name: 'units',
  pure: false
})
export class UnitsPipe implements PipeTransform {

  currentUnit!: string;
 
  transform(value: any): unknown {
    let currentValue = value;
    this.route.queryParams.subscribe((queryParams) => {
       if(!queryParams.hasOwnProperty('unit')) {
          queryParams = {unit: 'c'};
       }
      this.currentUnit = queryParams.unit;
      this.currentUnit == 'c' ? currentValue = value.c : currentValue = value.f;
    });
    return currentValue;
  }

  constructor(private route: ActivatedRoute) {}

}
