import { Routes } from '@angular/router';
import { UserEnabledGuard } from './guards/user-enabled.guard';

export const routes: Routes = [
  // Auth module - No guards needed
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  
  // Admin module - Protected with UserEnabledGuard
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [ UserEnabledGuard]
  },
  
  // User module - Protected with UserEnabledGuard
  { 
    path: 'user', 
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [ UserEnabledGuard]
  },
  
  // Home module - No guards needed
  {
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  
  // Employee module - Protected with UserEnabledGuard
  { 
    path: 'employee', 
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
    canActivate: [ UserEnabledGuard]
  },
  
  // Default route - Redirects to login
  { 
    path: '', 
    redirectTo: '/auth/login', 
    pathMatch: 'full' 
  },
  
  // Fallback route - Redirects to login
  { 
    path: '**', 
    redirectTo: '/auth/login' 
  }
];
