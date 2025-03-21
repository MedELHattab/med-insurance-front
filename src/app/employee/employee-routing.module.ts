import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ClaimsComponent } from './claims/claims.component';

import { EmployeeGuard } from '../guards/employee.guard';

const routes: Routes = [
  { path: 'subscriptions', component: SubscriptionsComponent, canActivate: [EmployeeGuard] },
  {path: 'claims', component: ClaimsComponent, canActivate: [EmployeeGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }
