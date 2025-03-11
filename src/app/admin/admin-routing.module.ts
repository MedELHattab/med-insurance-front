import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'; // Correct standalone path
import { UsersManagementComponent } from './users-management/users-management.component';
import { AdminGuard } from '../guards/admin.guard';
import { PoliciesComponent } from './policies/policies.component';
import { EmployeeGuard } from '../guards/employee.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [EmployeeGuard] },
  { path: 'users-management', component: UsersManagementComponent, canActivate: [AdminGuard] },
  { path: 'policies', component: PoliciesComponent, canActivate: [AdminGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
