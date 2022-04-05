import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProtectedModule } from '../protected/protected.module';
import { PublicModule } from '../public/public.module';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './component/404-error/page-not-found.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ProtectedModule,
    PublicModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    PageNotFoundComponent
  ],
})
export class CoreModule { }
