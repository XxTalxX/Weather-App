import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUrl!: {id: number, url: string};
  @ViewChild('toggle') toggle!: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute) { }
   
  ngOnInit(): void {
    this.router.events.pipe(filter((currentEvent) => currentEvent instanceof NavigationEnd)).subscribe((navEnd: any) => {
      navEnd.url == '/favorites' ? this.toggle.nativeElement.checked = true :
      this.toggle.nativeElement.checked = false;
    });
  }

  onToggleChange(event: any) {
    event.target.checked ? this.router.navigate(['favorites'], {relativeTo: this.route}) : 
    this.router.navigate(['main'], {relativeTo: this.route});
  }

  onUnitsChange(event: any) { 
  this.router.navigate([], {relativeTo: this.route, queryParams: {unit: event.target.checked ? 'f' : 'c'}});
  }

}
