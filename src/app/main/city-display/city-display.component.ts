import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UnitsPipe } from 'src/app/units.pipe';
import { Weather } from './days-list/weather.model';
import * as fromApp from '../../reducers/index';

@Component({
  selector: 'app-city-display',
  templateUrl: './city-display.component.html',
  styleUrls: ['./city-display.component.css'],
  providers: [UnitsPipe]
})
export class CityDisplayComponent implements OnInit, OnDestroy {
  
  errorMessage!: {error: string};
  weather!: Weather;
  isLoading: boolean = false;
  weatherSubscription!: Subscription;
  isDisabled: boolean = true;
  isChecked: boolean = false;

  constructor(private store: Store<fromApp.AppState>) { }



  ngOnInit(): void {
    this.weatherSubscription = this.store.select('weather').subscribe((weatherState) => {
     this.isLoading = weatherState.loading;
     this.errorMessage = weatherState.error;
     this.weather = weatherState.weather;
     if(!this.isLoading) {
      localStorage.getItem(weatherState.city) != null ? this.isChecked = true : this.isChecked = false;
        this.isDisabled = false;
     } else {
       this.isDisabled = true;
     }
    });
   }

  ngOnDestroy(): void {
    if(this.weatherSubscription){
    this.weatherSubscription.unsubscribe();
    }
}
}

