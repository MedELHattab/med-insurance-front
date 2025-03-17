import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  birthday: string;
  address?: string;
  phone?: string;
  image?: string;
  role: string;
  enabled?: boolean;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  birthday?: string;
  address?: string;
  phone?: string;
  password?: string;
  image?: string;
}

export interface ImageUploadResponse {
  imagePath: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Helper function to get auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all users (admin function)
  getUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(`${this.baseUrl}/users`, { headers });
  }

  // Get user by ID (admin function)
  getUserById(id: number): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.baseUrl}/users/${id}`, { headers });
  }

  // Create new user (admin function)
  createUser(user: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.post<User>(`${this.baseUrl}/users`, user, { headers });
  }

  // Update user (admin function)
  updateUser(id: number, user: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user, { headers });
  }

  // Delete user (admin function)
  deleteUser(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`, { headers });
  }

  // Toggle user enabled status (admin function)
  toggleUserEnabled(id: number): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.patch<User>(`${this.baseUrl}/users/${id}/toggle-enabled`, {}, { headers });
  }

  // Get current user's profile
  getUserProfile(): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.baseUrl}/users/profile`, { headers });
  }

  // Update current user's profile with multipart/form-data
  updateProfile(profileData: UpdateProfileRequest, imageFile?: File): Observable<User> {
    const headers = this.getAuthHeaders();

    // Create FormData object
    const formData = new FormData();

    // Add profile data as a string
    formData.append('profileData', JSON.stringify(profileData));

    // Add image if provided
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Send without explicit Content-Type header
    return this.http.put<User>(`${this.baseUrl}/users/profile`, formData, {
      headers: headers.delete('Content-Type')
    });
  }

  // Change password (uses the same updateProfile method)
  changePassword(newPassword: string): Observable<User> {
    const passwordRequest: UpdateProfileRequest = {
      password: newPassword
    };
    return this.updateProfile(passwordRequest);
  }
}