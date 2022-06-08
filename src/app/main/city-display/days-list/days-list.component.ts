import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NextDaysEntity } from './weather.model';
import * as fromApp from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UnitsPipe } from 'src/app/units.pipe';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';


@Component({
  selector: 'app-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.css'],
  providers: [UnitsPipe],
  animations: [trigger('listAnimation', [
    transition('* <=> *', [
      query(':enter',
        [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
        { optional: true }
      ),
      query(':leave',
        animate('300ms', style({ opacity: 0 })),
        { optional: true}
      )
    ])
  ]), trigger('fadeAnimation', [
    transition(':enter', [
      style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
    ),
    transition(':leave',
      [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
    )
  ])]
})

export class DaysListComponent implements OnInit,OnDestroy, AfterViewInit {

  weather_days!: NextDaysEntity[] | null | undefined;
  weatherSubscription!: Subscription;
  // @ViewChildren('daysList') daysList!: QueryList<ElementRef>;
  @ViewChildren('temperatureLine') tempLines!: QueryList<ElementRef<HTMLCanvasElement>>;
  drawingContext!: CanvasRenderingContext2D;
  averageTemp!: number;

  ngOnDestroy(): void {
    if(this.weatherSubscription) {
    this.weatherSubscription.unsubscribe();
    }
  }

  constructor(private store: Store<fromApp.AppState>) { }


  ngAfterViewInit(): void {
    
  }
  
  drawTemperatureLine() {
    const maximumTemperature: number = Math.max(...this.weather_days!.slice(0,6)
    .map((temp) => ((temp.max_temp.c + temp.min_temp.c)/2)));
    const minimumTemperature: number = Math.min(...this.weather_days!.slice(0,6)
    .map((temp) => ((temp.max_temp.c + temp.min_temp.c)/2)));
    const canvasHeight: number = 145;
    const lineScale: number = canvasHeight / (maximumTemperature - minimumTemperature);
    this.tempLines.forEach((line, index) => {
      this.drawingContext = line.nativeElement.getContext('2d')!;
      this.drawingContext.beginPath();
      this.drawingContext.lineWidth=20;
      var lineGradient = this.drawingContext.createLinearGradient(0,25,70,150);
      lineGradient.addColorStop(0, "steelblue");
      lineGradient.addColorStop(0.5, "wheat");
      lineGradient.addColorStop(1.0, "lightcoral");
      this.drawingContext.strokeStyle = lineGradient;
      let currentTemperature: number = (this.weather_days![index].max_temp.c + this.weather_days![index].min_temp.c)/2;
      let nextTemperature: number = (this.weather_days![index+1].max_temp.c + this.weather_days![index+1].min_temp.c)/2;      
      this.drawingContext.moveTo(0,lineScale*(maximumTemperature-currentTemperature));
      this.drawingContext.lineTo(310,lineScale*(maximumTemperature-nextTemperature));
      this.drawingContext.stroke();
   })
  }

  ngOnInit(): void {
    this.weatherSubscription = this.store.select('weather').subscribe((weatherState) => {
      this.weather_days = weatherState.weather.next_days;
     if(!weatherState.loading) {
      this.averageTemp = weatherState.weather.currentConditions.temp.c;
      setTimeout(() => this.drawTemperatureLine(), 500);
      }
    });
  }
}
