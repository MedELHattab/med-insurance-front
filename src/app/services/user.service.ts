import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAuthHeaders } from '../auth.utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; 
  
  constructor(private http: HttpClient) {}

  // GET: Fetch all users
  getUsers(): Observable<any> {
    const headers = getAuthHeaders();
    return this.http.get(this.apiUrl, { headers });
  }

  // GET: Fetch a single user by ID
  getUserById(id: number): Observable<any> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url, { headers });
  }

  // POST: Create a new user
  createUser(user: any): Observable<any> {
    const headers = getAuthHeaders();
    return this.http.post(this.apiUrl, user,  { headers });
  }

  // PUT: Update an existing user
  updateUser(id: number, user: any): Observable<any> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, user, { headers });
  }

  // DELETE: Delete a user by ID
  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const headers = getAuthHeaders();
    return this.http.delete(url, {headers});
  }

  // PATCH: Toggle user enabled status
  toggleUserEnabled(id: number): Observable<any> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/${id}/toggle-enabled`;
    return this.http.patch(url, {}, { headers });
  }

}