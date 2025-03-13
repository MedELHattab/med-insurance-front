import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAuthHeaders } from '../auth.utils';

export enum PolicyStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED'
}

export interface PolicyDTO {
  id?: number;
  name: string;
  description: string;
  percentage: number;  // Coverage percentage
  status: PolicyStatus;
}

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private apiUrl = 'http://localhost:8080/api/policies';
  
  constructor(private http: HttpClient) {}
  
  // GET: Fetch all policies
  getAllPolicies(): Observable<PolicyDTO[]> {
    const headers = getAuthHeaders();
    return this.http.get<PolicyDTO[]>(this.apiUrl, { headers });
  }
  
  // GET: Fetch a single policy by ID
  getPolicyById(id: number): Observable<PolicyDTO> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PolicyDTO>(url, { headers });
  }
  
  // POST: Create a new policy
  createPolicy(policy: PolicyDTO): Observable<PolicyDTO> {
    const headers = getAuthHeaders();
    return this.http.post<PolicyDTO>(this.apiUrl, policy, { headers });
  }
  
  // PUT: Update an existing policy
  updatePolicy(id: number, policy: PolicyDTO): Observable<PolicyDTO> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<PolicyDTO>(url, policy, { headers });
  }
  
  // DELETE: Delete a policy by ID
  deletePolicy(id: number): Observable<any> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers });
  }

  getActivePolicies(): Observable<PolicyDTO[]> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/active`;
    return this.http.get<PolicyDTO[]>(url, { headers });
  }
}