import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { User } from './user.service';

// Response interfaces
export interface LoginResponse {
  token: string;
  expiresIn: number;
  user?: UserData;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

// Request interfaces
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  birthday: string;
  address?: string;
  phone?: string;
}

export interface VerifyRequest {
  email: string;
  verificationCode: string;
}

// User data interface
export interface UserData {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Base API URL
  private baseUrl = 'http://localhost:8080';
  private uploadUrl = 'http://localhost:8080/api/uploads/';
  
  // Endpoints
  private loginEndpoint = `${this.baseUrl}/auth/login`;
  private registerEndpoint = `${this.baseUrl}/auth/signup`;
  private verifyEndpoint = `${this.baseUrl}/auth/verify`;

  // Auth status changed event emitter
  authStatusChanged = new EventEmitter<boolean>();
  
  // Current user data
  private currentUser = new BehaviorSubject<UserData | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is authenticated and load user data
    if (this.isAuthenticated()) {
      this.loadCurrentUser().subscribe();
    }
  }

  /**
   * Handles user login
   * @param email User email
   * @param password User password
   * @returns Observable with login response
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const credentials = { email, password };
    
    return this.http.post<LoginResponse>(this.loginEndpoint, credentials).pipe(
      tap((response) => {
        // Store auth data in localStorage
        this.storeAuthData(response);
        
        // Set current user if included in response
        if (response.user) {
          this.currentUser.next(response.user);
        } else {
          // If user data not included, fetch it
          this.loadCurrentUser().subscribe();
        }
        
        // Emit auth status changed event
        this.authStatusChanged.emit(true);
      }),
      catchError(error => this.handleError(error) as Observable<never>)
    );
  }

  /**
   * Handles user registration with image upload
   * @param userData User registration data
   * @param profileImage Optional profile image file
   * @returns Observable with registration response
   */
  register(userData: RegisterRequest, profileImage?: File): Observable<RegisterResponse> {
    // Create FormData object for sending data and image
    const formData = new FormData();
    formData.append('user', JSON.stringify(userData));
    
    if (profileImage) {
      formData.append('image', profileImage);
    }
    
    // Use responseType: 'text' to avoid JSON parsing errors
    return this.http.post(this.registerEndpoint, formData, { 
      responseType: 'text'
    }).pipe(
      // Map the text response to our expected format
      tap(response => {
        console.log('Registration successful, server response:', response);
      }),
      // Convert the text response to our expected object format
      map((textResponse: string) => {
        return {
          success: true,
          message: textResponse || 'Registration successful!'
        } as RegisterResponse;
      }),
      catchError(error => this.handle201Error(error) as Observable<RegisterResponse>)
    );
  }

  /**
   * Handles email verification
   * @param verifyData Verification data including email and code
   * @returns Observable with verification response as a string
   */
  verifyEmail(verifyData: VerifyRequest): Observable<string> {
    return this.http.post(this.verifyEndpoint, verifyData, { 
      responseType: 'text'
    }).pipe(
      catchError(error => this.handleError(error) as Observable<never>)
    );
  }

  /**
   * Logs out the user by removing stored tokens
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('userData');
    
    // Clear current user
    this.currentUser.next(null);
    
    // Emit auth status changed event
    this.authStatusChanged.emit(false);
  }

  /**
   * Checks if user is currently authenticated
   * @returns boolean indicating authentication status
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    const expiresAt = localStorage.getItem('expiresAt');
    
    if (!token || !expiresAt) {
      return false;
    }
    
    return new Date().getTime() < parseInt(expiresAt);
  }

  /**
   * Get current user data
   * @returns Current user data or null if not authenticated
   */
  getCurrentUser(): UserData | null {
    // First check if we have user data in memory
    const currentUserValue = this.currentUser.value;
    if (currentUserValue) {
      return currentUserValue;
    }
    
    // If not in memory, try to get from localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString) as UserData;
        // Format the profile image URL if it exists but doesn't have the full path
        if (userData.profileImage && !userData.profileImage.startsWith('http')) {
          userData.profileImage = this.getImageUrl(userData.profileImage);
        }
        // Update the BehaviorSubject
        this.currentUser.next(userData);
        return userData;
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        return null;
      }
    }
    
    // If we get here, we don't have user data
    return null;
  }

  /**
   * Load current user data from API
   * @returns Observable with user data
   */
  loadCurrentUser(): Observable<UserData> {
    if (!this.isAuthenticated()) {
      return throwError(() => new Error('User not authenticated'));
    }
    
    return this.http.get<User>(`${this.baseUrl}/api/users/profile`, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    }).pipe(
      map(user => {
        const userData: UserData = {
          id: user.id!,
          name: user.name,
          email: user.email,
          profileImage: user.image ? this.getImageUrl(user.image) : undefined
        };
        
        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        // Update current user
        this.currentUser.next(userData);
        
        return userData;
      }),
      catchError(error => {
        // If unauthorized, log out user
        if (error.status === 401) {
          this.logout();
        }
        return this.handleError(error) as Observable<never>;
      })
    );
  }

  /**
   * Get full image URL from image path
   * @param imagePath The relative image path
   * @returns Full image URL
   */
  getImageUrl(imagePath: string): string {
    // If it's already a full URL, return it
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, append the base upload URL
    return `${this.uploadUrl}${imagePath}`;
  }

  /**
   * Get user role from JWT token
   * @returns User role or null if not authenticated or token is invalid
   */
  getUserRole(): string | null {
    const token = this.getToken();
    
    if (!token) {
      return null;
    }
    
    try {
      // JWT token consists of three parts separated by dots
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        return null;
      }
      
      // Decode the payload (second part)
      const payload = JSON.parse(atob(tokenParts[1]));
      
      // Return the role from the payload
      return payload.role || payload.authorities || null;
    } catch (error) {
      console.error('Error parsing JWT token', error);
      return null;
    }
  }

  /**
   * Get authentication token
   * @returns Auth token or null
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Store authentication data in localStorage
   * @param authData Authentication response data
   */
  private storeAuthData(authData: LoginResponse): void {
    localStorage.setItem('token', authData.token);
    
    // Calculate token expiration time
    const expiresAt = new Date().getTime() + authData.expiresIn * 1000;
    localStorage.setItem('expiresAt', expiresAt.toString());
    
    // Store user data if available
    if (authData.user) {
      // Format the profile image URL if needed
      if (authData.user.profileImage && !authData.user.profileImage.startsWith('http')) {
        authData.user.profileImage = this.getImageUrl(authData.user.profileImage);
      }
      localStorage.setItem('userData', JSON.stringify(authData.user));
    }
  }

  /**
   * Error handler for 201 status codes on registration
   * @param error HTTP error
   * @returns Observable with RegisterResponse for 201 status or throws error
   */
  private handle201Error(error: HttpErrorResponse): Observable<RegisterResponse> {
    // Handle special case for 201 Created status
    if (error.status === 201) {
      console.log('This is actually a success (201 Created)');
      // Extract the response text if available
      const successMessage = typeof error.error === 'string' 
        ? error.error 
        : 'Registration successful!';
        
      return of({
        success: true,
        message: successMessage
      });
    }
    
    // For other errors, get message and throw
    const errorMessage = this.extractErrorMessage(error);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Error handler for HTTP requests
   * @param error HTTP error
   * @returns Observable with error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = this.extractErrorMessage(error);
    return throwError(() => new Error(errorMessage));
  }
  
  /**
   * Extract error message from HttpErrorResponse
   * @param error The HTTP error response
   * @returns A string error message
   */
  private extractErrorMessage(error: HttpErrorResponse): string {
    // For client-side errors
    if (error.error instanceof ErrorEvent) {
      return `Client error: ${error.error.message}`;
    }
    
    // For server-side errors
    if (typeof error.error === 'string') {
      // If the error is already a string, return it
      return error.error;
    }
    
    // If the error has a message property
    if (error.error && typeof error.error.message === 'string') {
      return error.error.message;
    }
    
    // Default error message with status code
    return `Error ${error.status}: ${error.message || 'Unknown error'}`;
  }
}