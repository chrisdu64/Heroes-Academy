import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateHeroComponent } from './update-hero/update-hero/update-hero.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateRoutingModule } from './update-routing.module';
import { UpdateAbilityComponent } from './update-ability/update-ability.component';
import { UpdateTechniqueComponent } from './update-technique/update-technique.component';
import { UpdateHeroDtoComponent } from './update-hero-dto/update-hero-dto.component';



@NgModule({
  declarations: [UpdateHeroComponent, UpdateAbilityComponent, UpdateTechniqueComponent, UpdateHeroDtoComponent],
  imports: [
    SharedModule,
    UpdateRoutingModule
  ],
  exports: [
    UpdateHeroComponent,
    UpdateAbilityComponent,
    UpdateTechniqueComponent,
    UpdateHeroDtoComponent
  ]
})
export class UpdateModule { }
