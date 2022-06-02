import * as WeatherActions from '../city-display/weather.actions';
import { Weather } from './days-list/weather.model';


export const weatherFeatureKey = 'weather';

export interface WeatherState {
  weather: Weather;
  error: {error: string};
  loading: boolean;
  city: string
}

export const initialState: WeatherState = {
  weather: {
    region: "no data",
    contact_author: null!,
    currentConditions: null!,
    data_source: "no data",
    next_days: null,
  },
  city: null!,
  error: null!,
  loading: true,
};

export function weatherReducer(state = initialState, action: WeatherActions.WeatherActions): WeatherState {
  switch (action.type) {
    case WeatherActions.WeatherActionTypes.LoadWeathers:
      return {
        ...state,
        city: action.payload,
        loading: true
      };

    case WeatherActions.WeatherActionTypes.LoadWeathersSuccess:
      return {
        ...state,
        weather: {...action.payload},
        loading: false,
      };

      case WeatherActions.WeatherActionTypes.LoadWeathersFailure:
        return {
          ...state,
          weather: null!,
          error: action.payload,
          loading: false
        };
    default:
      return state;
  }
}
