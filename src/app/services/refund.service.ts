import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAuthHeaders } from '../auth.utils';

export interface RefundDTO {
  id?: number;
  claimId: number;
  userId: number;
  userName?: string;
  amount: number;
  reference: string;
  createdAt?: string;
  paid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RefundService {
  private apiUrl = 'http://localhost:8080/api/refunds';
  
  constructor(private http: HttpClient) {}
  
  // GET: Fetch all refunds
  getAllRefunds(): Observable<RefundDTO[]> {
    const headers = getAuthHeaders();
    return this.http.get<RefundDTO[]>(this.apiUrl, { headers });
  }
  
  // GET: Fetch a single refund by ID
  getRefundById(id: number): Observable<RefundDTO> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RefundDTO>(url, { headers });
  }
  
  // GET: Fetch refunds by user ID
  getRefundsByUser(userId: number): Observable<RefundDTO[]> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<RefundDTO[]>(url, { headers });
  }
  
  // PATCH: Update refund payment status
  updatePaymentStatus(id: number, paid: boolean): Observable<any> {
    const headers = getAuthHeaders();
    const url = `${this.apiUrl}/${id}/payment-status?paid=${paid}`;
    // Specify responseType as 'text' to handle a text response
    return this.http.patch(url, {}, { 
      headers,
      responseType: 'text' as 'json' // This tells Angular to treat the response as text
    });
  }
}