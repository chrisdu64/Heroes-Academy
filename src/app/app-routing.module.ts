import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/component/404-error/page-not-found.component';
import { DeleteAbilityComponent } from './protected/delete/delete-ability/delete-ability.component';
import { DeleteTechniqueComponent } from './protected/delete/delete-technique/delete-technique.component';
import { DetailComponent } from './protected/detail/detail.component';
import { HeroesListComponent } from './protected/heroes-list/heroes-list.component';
import { NewAbilityComponent } from './protected/new-ability/new-ability.component';
import { NewHeroComponent } from './protected/new-hero/new-hero.component';
import { NewTechniqueComponent } from './protected/new-technique/new-technique.component';
import { DeletePageComponent } from './public/delete-page/delete-page.component';
import { HomeComponent } from './public/home/home.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesListComponent },
  // { path: 'search', component: HeroesListComponent },
  { path: 'search/:searchTerm', component: HeroesListComponent },
  { path: 'heroes/:id', component: DetailComponent },
  { path: 'delete', component: DeletePageComponent },
  { path: 'delete/ability/:id', component: DeleteAbilityComponent },
  { path: 'delete/technique/:id', component: DeleteTechniqueComponent },
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
