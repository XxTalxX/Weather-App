import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Weather } from '../main/city-display/days-list/weather.model';
import * as fromApp from '../reducers/index';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as WeatherActions from '../main/city-display/weather.actions';




@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css', '../main/city-display/days-list/days-list.component.css']
})
export class FavoritesComponent implements OnInit {

  favoriteWeathers: Weather[] = [];


  constructor(private router: Router, private store: Store<fromApp.AppState>) { }


  removeAll() {
    localStorage.clear();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['favorites']);
    });
  }

  showWeather(weather: Weather, weatherIndex: number) {
    this.store.dispatch(new WeatherActions.LoadWeathersSuccess(weather))
    this.router.navigate(['main', localStorage.key(weatherIndex)]);
  }


removeFavorite(weatherIndex: number) {
    localStorage.removeItem(localStorage.key(weatherIndex)!);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['favorites']);
      });
}

  ngOnInit(): void {
    for(var i = 0; i < localStorage.length; i++)
    {
    this.favoriteWeathers.push(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem(localStorage.key(i)!)))));
    }
  }



}
