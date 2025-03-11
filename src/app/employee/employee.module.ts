import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    // If using standalone component
    SubscriptionsComponent

  ]
})
export class EmployeeModule { }
