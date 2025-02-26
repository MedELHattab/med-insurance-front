import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/auth/login' }, // Fallback route
];
