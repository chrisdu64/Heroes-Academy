import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './protected/detail/detail.component';
import { HeroesListComponent } from './protected/heroes-list/heroes-list.component';
import { HomeComponent } from './public/home/home.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesListComponent },
  { path: 'heroes/:id', component: DetailComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
