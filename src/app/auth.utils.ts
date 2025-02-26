import { HttpHeaders } from '@angular/common/http';

export function getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token'); // Retrieve the token from local storage
  return new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}` // Add the token to the Authorization header
  });
}