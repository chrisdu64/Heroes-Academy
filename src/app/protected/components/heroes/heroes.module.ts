import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { DetailComponent } from './detail/detail.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    CardComponent,
    HeroesListComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    CoreModule
  ],
  exports: [
    CardComponent,
    HeroesListComponent,
    DetailComponent
  ]
})
export class HeroesModule { }
