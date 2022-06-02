import { Directive, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core';
import * as WeatherActions from './weather.actions';
import * as fromApp from '../../reducers/index';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Weather } from './days-list/weather.model';

@Directive({
  selector: '[hightlight]'
})
export class HightlightDirective implements OnInit, OnDestroy {

  weatherSubscribtion!: Subscription;
  weather!: Weather;

  constructor(private store: Store<fromApp.AppState>) {}


  ngOnInit(): void {
    this.weatherSubscribtion = this.store.select('weather').subscribe((weatherState) => {
      this.weather = weatherState.weather;
    });
  
  }
  ngOnDestroy(): void {
    if(this.weatherSubscribtion) {
      this.weatherSubscribtion.unsubscribe();
    }
  }


  @HostListener('change' , ['$event']) change(eventData: any) {
      if(eventData.target.checked) {
        this.store.dispatch(new WeatherActions.AddToFavorites(this.weather))
      }
      else {
        this.store.dispatch(new WeatherActions.UnFavorite(this.weather));
      }
  }

}
