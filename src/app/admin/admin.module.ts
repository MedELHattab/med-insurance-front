import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    
  ]
})
export class AdminModule { }
