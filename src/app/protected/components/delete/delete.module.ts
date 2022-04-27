import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteAbilityComponent } from './delete-ability/delete-ability.component';
import { DeletePageComponent } from './delete-page/delete-page.component';
import { DeleteRoutingModule } from './delete-routing.module';
import { DeleteTechniqueComponent } from './delete-technique/delete-technique.component';



@NgModule({
  declarations: [
    DeleteAbilityComponent,
    DeletePageComponent,
    DeleteTechniqueComponent,
  ],
  imports: [
    SharedModule,
    DeleteRoutingModule
  ],
  exports: [
    DeleteAbilityComponent,
    DeletePageComponent,
    DeleteTechniqueComponent,
  ]
})
export class DeleteModule { }
