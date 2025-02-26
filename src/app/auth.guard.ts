import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  role?: string;
  authorities?: string | string[];
  roles?: string[];
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      // Decode the token to get user information
      const decodedToken: DecodedToken = jwtDecode(token);

      // Check if the token is expired
      const currentTime = new Date().getTime() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        alert('Session expired. Please log in again.');
        this.router.navigate(['/login']);
        return false;
      }
      
      // Extract role from the token
      const userRole = this.extractRoleFromToken(decodedToken);
      
      // Check if route requires specific roles
      const requiredRoles = route.data['roles'] as Array<string>;
      
      if (requiredRoles && requiredRoles.length > 0) {
        // If specific roles are required, check if user has any of them
        const hasRequiredRole = requiredRoles.some(role => userRole === role);
        
        if (!hasRequiredRole) {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }
      
      // For admin-only routes
      if (route.data['adminOnly'] === true && userRole !== 'ADMIN') {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
  
  /**
   * Extract role from JWT token
   * @param decodedToken The decoded JWT token
   * @returns The user's role or null if not found
   */
  private extractRoleFromToken(decodedToken: DecodedToken): string | null {
    // Common patterns for role storage in JWT tokens
    
    // 1. Direct 'role' property
    if (decodedToken.role) {
      return decodedToken.role;
    }
    
    // 2. Check 'authorities' as a string
    if (typeof decodedToken.authorities === 'string') {
      return decodedToken.authorities;
    }
    
    // 3. Check 'authorities' as an array
    if (Array.isArray(decodedToken.authorities) && decodedToken.authorities.length > 0) {
      // Return the first authority/role
      return decodedToken.authorities[0];
    }
    
    // 4. Check 'roles' array
    if (Array.isArray(decodedToken.roles) && decodedToken.roles.length > 0) {
      return decodedToken.roles[0];
    }
    
    // 5. Look for any property containing 'role' in its name
    for (const key in decodedToken) {
      if (key.toLowerCase().includes('role') && decodedToken[key]) {
        return decodedToken[key];
      }
    }
    
    // No role found
    return null;
  }
}