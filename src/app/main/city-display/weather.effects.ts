import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from "@angular/common/http";
import * as WeatherActions from '../city-display/weather.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Weather } from './days-list/weather.model';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../reducers/index';
import { Store } from '@ngrx/store';


const weatherAPI: string = "https://weatherdbi.herokuapp.com/data/weather/";
let cityName: string;

@Injectable()
export class WeatherEffects {

   @Effect()
   fetchWeather = this.actions$.pipe(ofType(WeatherActions.WeatherActionTypes.LoadWeathers),
   switchMap((loadWeathersAction: WeatherActions.LoadWeathers) => {
     cityName = loadWeathersAction.payload;
     this.router.navigate(['/main',loadWeathersAction.payload], {relativeTo: this.route})
     return this.httpClient.get<Weather>(weatherAPI + loadWeathersAction.payload);
   }),map((weather: Weather) => {
      return weather;
   }), map((weather) => {
      return new WeatherActions.LoadWeathersSuccess(weather);
   }), catchError((errorResponse) => {
      if(!errorResponse.error || !errorResponse.error.error) {
        return of(new WeatherActions.LoadWeathersFailure({error: errorResponse.message}));
      }
      return of(new WeatherActions.LoadWeathersFailure(errorResponse));
   }),
   );

   @Effect({dispatch: false})
   addWeatherToFavorites = this.actions$.pipe(ofType(WeatherActions.WeatherActionTypes.AddToFavorites),
   switchMap((addToFavoritesAction: WeatherActions.AddToFavorites) => {
         return of(localStorage.setItem(cityName, JSON.stringify(addToFavoritesAction.payload)));
   }));
       

   @Effect({dispatch: false})
   unFavorite = this.actions$.pipe(ofType(WeatherActions.WeatherActionTypes.UnFavorite),
   switchMap((unFavoriteAction: WeatherActions.UnFavorite) => {
      return of(localStorage.removeItem(cityName));
   }));

  constructor(private actions$: Actions, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) {}

}
