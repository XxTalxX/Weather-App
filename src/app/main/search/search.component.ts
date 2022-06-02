import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as WeatherActions from '../city-display/weather.actions';
import * as fromApp from '../../reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm!: FormGroup;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup(
      { 'citysearch': new FormControl(null, [Validators.required, Validators.maxLength(12),
                                             Validators.minLength(2), Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)]
                                            )});
  }

  onSubmit() {
    this.store.dispatch(new WeatherActions.LoadWeathers(this.searchForm.value.citysearch.toString().trim().toLowerCase()));
  }

}
