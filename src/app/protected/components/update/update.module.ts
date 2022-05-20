import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateHeroDtoComponent } from './update-hero-dto/update-hero-dto.component';
import { UpdateRoutingModule } from './update-routing.module';



@NgModule({
  declarations: [UpdateHeroDtoComponent],
  imports: [
    SharedModule,
    UpdateRoutingModule
  ],
  exports: [
    UpdateHeroDtoComponent
  ]
})
export class UpdateModule { }
