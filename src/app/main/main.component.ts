import { Component, OnDestroy, OnInit } from '@angular/core';
import * as WeatherActions from '../main/city-display/weather.actions';
import * as fromApp from '../reducers/index';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  weatherSubscribtion!: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    if(this.weatherSubscribtion) {
      this.weatherSubscribtion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.weatherSubscribtion = this.store.select('weather').subscribe((weatherState) => {
      if(weatherState.city == null) {
        this.store.dispatch(new WeatherActions.LoadWeathers('telaviv'));
      }
        return weatherState;
    });
  }

}
