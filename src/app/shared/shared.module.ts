import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindPipe } from './pipes/find.pipe';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    FindPipe,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FindPipe,
    FilterPipe
  ]
})
export class SharedModule { }
