import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/component/404-error/page-not-found.component';
import { HomeComponent } from './public/home/home.component';

const routes: Routes = [
  { path: 'protected', loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule) },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
