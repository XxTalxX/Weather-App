import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { weatherReducer, WeatherState } from '../main/city-display/weather.reducer';


export interface AppState {
  weather: WeatherState
};

export const reducers: ActionReducerMap<AppState, any> = {
  weather: weatherReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
