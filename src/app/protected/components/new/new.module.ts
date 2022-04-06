import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewAbilityComponent } from './new-ability/new-ability.component';
import { NewHeroComponent } from './new-hero/new-hero.component';
import { NewRoutingModule } from './new-routing.module';
import { NewTechniqueComponent } from './new-technique/new-technique.component';



@NgModule({
  declarations: [
    NewAbilityComponent,
    NewTechniqueComponent,
    NewHeroComponent
  ],
  imports: [
    SharedModule,
    NewRoutingModule
  ],
  exports: [
    NewAbilityComponent,
    NewTechniqueComponent,
    NewHeroComponent
  ]
})
export class NewModule { }
