import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProtectedModule } from '../protected/protected.module';
import { PublicModule } from '../public/public.module';
import { PageNotFoundComponent } from './component/404-error/page-not-found.component';
import { HeaderComponent } from './component/header/header.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ProtectedModule,
    PublicModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    PageNotFoundComponent
  ],
})
export class CoreModule { }
