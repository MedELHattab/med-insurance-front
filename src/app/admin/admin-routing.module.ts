import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'; // Correct standalone path
import { UsersManagementComponent } from './users-management/users-management.component';
import { AuthGuard } from '../auth.guard';
import { PoliciesComponent } from './policies/policies.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users-management', component: UsersManagementComponent, canActivate: [AuthGuard] },
  { path: 'policies', component: PoliciesComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
