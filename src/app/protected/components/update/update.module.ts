import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateHeroComponent } from './update-hero/update-hero/update-hero.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateRoutingModule } from './update-routing.module';



@NgModule({
  declarations: [UpdateHeroComponent],
  imports: [
    SharedModule,
    UpdateRoutingModule
  ],
  exports: [
    UpdateHeroComponent
  ]
})
export class UpdateModule { }
