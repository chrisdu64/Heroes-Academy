import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAbilityComponent } from './delete-ability/delete-ability.component';
import { DeletePageComponent } from './delete-page/delete-page.component';
import { DeleteTechniqueComponent } from './delete-technique/delete-technique.component';
import { DeleteRoutingModule } from './delete-routing.module';



@NgModule({
  declarations: [
    DeleteAbilityComponent,
    DeletePageComponent,
    DeleteTechniqueComponent
  ],
  imports: [
    CommonModule,
    DeleteRoutingModule
  ],
  exports: [
    DeleteAbilityComponent,
    DeletePageComponent,
    DeleteTechniqueComponent,
  ]
})
export class DeleteModule { }
