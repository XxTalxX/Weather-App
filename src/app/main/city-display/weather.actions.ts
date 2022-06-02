import { Action } from '@ngrx/store';
import { Weather } from './days-list/weather.model';

export enum WeatherActionTypes {
  LoadWeathers = '[Weather] Load Weathers',
  LoadWeathersSuccess = '[Weather] Load Weathers Success',
  LoadWeathersFailure = '[Weather] Load Weathers Failure',
  AddToFavorites = '[Weather] Add To Favorites',
  UnFavorite = '[Weather] UnFavorite'
}

export class LoadWeathers implements Action {
  readonly type = WeatherActionTypes.LoadWeathers;
  constructor(public payload: string) {}
}

export class LoadWeathersSuccess implements Action {
  readonly type = WeatherActionTypes.LoadWeathersSuccess;
  constructor(public payload: Weather ) { }
}

export class LoadWeathersFailure implements Action {
  readonly type = WeatherActionTypes.LoadWeathersFailure;
  constructor(public payload: { error: any }) { }
}

export class AddToFavorites implements Action { 
  readonly type = WeatherActionTypes.AddToFavorites;
  constructor(public payload: Weather) {}
}

export class UnFavorite implements Action {
  readonly type = WeatherActionTypes.UnFavorite;
  constructor(public payload: Weather) {}
}


export type WeatherActions = LoadWeathers | LoadWeathersSuccess | LoadWeathersFailure | AddToFavorites | UnFavorite;

