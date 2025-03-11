// admin.guard.ts
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
export class AdminGuard implements CanActivate {
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
      
      // Extract role from the token
      const userRole = this.extractRoleFromToken(decodedToken);
      
      // Check if user is an admin
      if (userRole !== 'ADMIN') {
        this.router.navigate(['/login']);
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