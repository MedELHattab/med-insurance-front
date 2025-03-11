import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAuthHeaders } from '../auth.utils';

export enum ClaimStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface ClaimDTO {
  id?: number;
  userId?: number;
  policyId?: number;
  userName?: string;
  policyName?: string;
  description: string;
  image?: string;
  createdAt?: string;
  status: ClaimStatus;
}

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'http://localhost:8080/api/claims';
  
  constructor(private http: HttpClient) {}
  
  // GET: Fetch all claims
  getAllClaims(): Observable<ClaimDTO[]> {
    const headers = getAuthHeaders();
    return this.http.get<ClaimDTO[]>(this.apiUrl, { headers });
  }
  
  // GET: Fetch a single claim by ID
  getClaimById(id: number): Observable<ClaimDTO> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ClaimDTO>(url, { headers });
  }
  
  // PUT: Update claim status
  updateClaimStatus(claimId: number, status: ClaimStatus): Observable<any> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/${claimId}/status?status=${status}`;
    // Specify responseType as 'text' to handle a text response
    return this.http.put(url, {}, { 
      headers,
      responseType: 'text' as 'json' // This tells Angular to treat the response as text
    });
  }
  
  // POST: Submit a new claim
  submitClaim(claim: ClaimDTO): Observable<ClaimDTO> {
    const headers = getAuthHeaders();
    return this.http.post<ClaimDTO>(this.apiUrl, claim, { headers });
  }
}