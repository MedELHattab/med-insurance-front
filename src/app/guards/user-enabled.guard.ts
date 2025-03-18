import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserEnabledGuard implements CanActivate {
  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // If user is not authenticated, redirect to login
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/login']);
    }
    
    // Get current user profile from API
    return this.userService.getUserProfile().pipe(
      map(user => {
        // Check if user is enabled
        if (user && user.enabled === true) {
          // User is enabled, allow access
          return true;
        } else {
          // User is disabled, redirect to login
          this.authService.logout(); // Log them out since they're disabled
          return this.router.createUrlTree(['/login']);
        }
      }),
      catchError(error => {
        // In case of error, redirect to login
        console.error('Error checking user status:', error);
        this.authService.logout();
        return of(this.router.createUrlTree(['/login']));
      })
    );
  }
}