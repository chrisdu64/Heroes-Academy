import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from './card/card.component';
import { DetailComponent } from './detail/detail.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';



@NgModule({
  declarations: [
    CardComponent,
    HeroesListComponent,
    DetailComponent,
    HeroesComponent,
  ],
  imports: [
    SharedModule,
    HeroesRoutingModule
  ],
  exports: [
    CardComponent,
    HeroesListComponent,
    DetailComponent
  ]
})
export class HeroesModule { }
