import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent, children: [{path: ':city-name', component: MainComponent}], data: {reuseComponent: true}},
  {path: 'favorites', component: FavoritesComponent},
  {path: '**', redirectTo: 'main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
