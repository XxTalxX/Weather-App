import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './main/search/search.component';
import { DaysListComponent } from './main/city-display/days-list/days-list.component';
import { CityDisplayComponent } from './main/city-display/city-display.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './main/city-display/weather.effects';
import { CommonModule } from '@angular/common';
import { UnitsPipe } from './units.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './reuse.strategy';
import { HightlightDirective } from './main/city-display/hightlight.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FavoritesComponent,
    MainComponent,
    SearchComponent,
    DaysListComponent,
    CityDisplayComponent,
    UnitsPipe,
    HightlightDirective,
    ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([WeatherEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: RouteReuseStrategy, useClass: CustomReuseStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
