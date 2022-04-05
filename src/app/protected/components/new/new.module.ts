import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAbilityComponent } from './new-ability/new-ability.component';
import { NewTechniqueComponent } from './new-technique/new-technique.component';
import { NewHeroComponent } from './new-hero/new-hero.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewRoutingModule } from './new-routing.module';



@NgModule({
  declarations: [
    NewAbilityComponent,
    NewTechniqueComponent,
    NewHeroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NewRoutingModule
  ],
  exports: [
    NewAbilityComponent,
    NewTechniqueComponent,
    NewHeroComponent
  ]
})
export class NewModule { }
