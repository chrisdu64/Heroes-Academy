import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './protected/card/card.component';
import { HeaderComponent } from './core/component/header/header.component';
import { DetailComponent } from './protected/detail/detail.component';
import { HeroesListComponent } from './protected/heroes-list/heroes-list.component';
import { HomeComponent } from './public/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FindPipe } from './shared/pipes/find.pipe';
import { PageNotFoundComponent } from './core/component/404-error/page-not-found.component';
import { NewAbilityComponent } from './protected/new-ability/new-ability.component';
import { NewTechniqueComponent } from './protected/new-technique/new-technique.component';
import { NewHeroComponent } from './protected/new-hero/new-hero.component';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HeaderComponent,
    DetailComponent,
    HeroesListComponent,
    HomeComponent,
    FindPipe,
    PageNotFoundComponent,
    NewAbilityComponent,
    NewTechniqueComponent,
    NewHeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
