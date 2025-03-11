import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAuthHeaders } from '../auth.utils';

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED'
}

export interface SubscriptionDTO {
  id?: number;
  userId?: number;
  policyId: number;
  userName?: string;
  policyName?: string;
  subscriptionDate?: string;
  endDate?: string;
  status: SubscriptionStatus;
  coveragePercentage?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:8080/api/subscriptions';

  constructor(private http: HttpClient) { }

  // GET: Fetch all subscriptions (ADMIN only)
  getAllSubscriptions(): Observable<SubscriptionDTO[]> {
    const headers = getAuthHeaders();
    return this.http.get<SubscriptionDTO[]>(this.apiUrl, { headers });
  }

  // GET: Fetch current user's subscription
  getMySubscription(): Observable<SubscriptionDTO> {
    const headers = getAuthHeaders();
    return this.http.get<SubscriptionDTO>(`${this.apiUrl}/my-subscription`, { headers });
  }

  // POST: Subscribe to a policy
  subscribeToPolicy(policyId: number): Observable<SubscriptionDTO> {
    const headers = getAuthHeaders();
    return this.http.post<SubscriptionDTO>(`${this.apiUrl}/subscribe?policyId=${policyId}`, {}, { headers });
  }

  // PUT: Upgrade subscription to a new policy
  upgradeSubscription(newPolicyId: number): Observable<SubscriptionDTO> {
    const headers = getAuthHeaders();
    return this.http.put<SubscriptionDTO>(`${this.apiUrl}/upgrade?newPolicyId=${newPolicyId}`, {}, { headers });
  }

  // PUT: Update subscription status (EMPLOYEE only)
  updateSubscriptionStatus(subscriptionId: number, newStatus: SubscriptionStatus): Observable<any> {
    const headers = getAuthHeaders();

    // Specify responseType as 'text' to handle a text response
    return this.http.put<any>(
      `${this.apiUrl}/${subscriptionId}/status?newStatus=${newStatus}`,
      {},
      {
        headers,
        responseType: 'text' as 'json' // This tells Angular to treat the response as text
      }
    );
  }
}