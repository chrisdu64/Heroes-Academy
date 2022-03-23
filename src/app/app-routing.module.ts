import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/component/404-error/page-not-found.component';
import { DetailComponent } from './protected/detail/detail.component';
import { HeroesListComponent } from './protected/heroes-list/heroes-list.component';
import { NewAbilityComponent } from './protected/new-ability/new-ability.component';
import { NewHeroComponent } from './protected/new-hero/new-hero.component';
import { NewTechniqueComponent } from './protected/new-technique/new-technique.component';
import { HomeComponent } from './public/home/home.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesListComponent },
  { path: 'heroes/:id', component: DetailComponent },
  { path: 'create/hero', component: NewHeroComponent },
  { path: 'create/ability/:id', component: NewAbilityComponent },
  { path: 'create/technique/:id', component: NewTechniqueComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
