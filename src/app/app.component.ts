import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from './reducers/index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  backGroundSunny = 'linear-gradient(rgba(247, 231, 16, 0.76)40%,transparent) center/cover';
  backGroundPartly = 'linear-gradient(rgba(255, 252, 48, 0.705),rgba(148, 230, 250, 0.705)40%,transparent) center/cover'; 
  backGroundCloudy = 'linear-gradient(rgba(137, 180, 194, 0.808),transparent) center/cover';
  dropPositionList: number[] = [];
  darkClouds: boolean = false;
  showSun: boolean = false;
  showRain: boolean = false;
  showClouds: boolean = false;
  backGroundStyle!: string;
  weatherSubscription!: Subscription;
  currentWeather!: string;
  isLoading: boolean = true;

  
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnDestroy(): void {
    if(this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

  chooseWeatherBackGround() {
    switch(true) {
      case this.currentWeather.toLowerCase().includes('partly') || this.currentWeather.toLowerCase().includes('clear'): {
         this.backGroundStyle = this.backGroundPartly;
         this.showSun = true;
         this.showClouds = true;
         this.darkClouds = false;
         this.showRain = false;
         break;
      }
      case this.currentWeather.toLowerCase().includes('rain') || this.currentWeather.toLowerCase().includes('storm'): {
        this.backGroundStyle = this.backGroundCloudy;
        this.showSun = false;
        this.showRain = true;
        this.showClouds = true;
        this.darkClouds = true;
        break;
      }
      case this.currentWeather.toLowerCase().includes('cloudy') && !this.currentWeather.toLowerCase().includes('partly'): {
        this.backGroundStyle = this.backGroundCloudy;
        this.showSun = false;
        this.showRain = false;
        this.showClouds = true;
        this.darkClouds = true;
        break;
      }
      case this.currentWeather.toLowerCase().includes('sun'): {
        this.backGroundStyle = this.backGroundSunny;
        this.showSun = true;
        this.showRain = false;
        this.showClouds = false;
        this.darkClouds = false;
        break;
      }
      default: {
        this.backGroundStyle = 'transparent';
        this.showRain = false;
        this.showClouds = false;
        this.showSun = false;
      }

    }
  }


  ngOnInit(): void {

    this.weatherSubscription = this.store.select('weather').subscribe((weatherState) => {
      this.isLoading = weatherState.loading;
      if(!weatherState.loading) {
        this.currentWeather = weatherState.weather.currentConditions.comment;
        this.chooseWeatherBackGround();
        if(this.showRain) {
          for (let index = (Math.floor(Math.random() * (98 - 1 + 1) + 1)); index < 100; index++) {
            this.dropPositionList[index] = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
          }
      }
      }
    });
  }

  
}
