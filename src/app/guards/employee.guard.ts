import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard {
  
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = this.authService.getUserRole();
    
    // Allow access if user is EMPLOYEE or ADMIN
    if (userRole === 'EMPLOYEE' || userRole === 'ADMIN') {
      return true;
    }
    
    // Redirect to dashboard if not authorized
    this.router.navigate(['/dashboard']);
    return false;
  }
}