import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedComponent } from './protected.component';

@NgModule({
  declarations: [
    ProtectedComponent
  ],
  imports: [
    ProtectedRoutingModule,
    SharedModule
  ]
})
export class ProtectedModule { }
