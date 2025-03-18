import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStats {
  totalUsers: number;
  totalPolicies: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalClaims: number;
  pendingClaims: number;
  approvedClaims: number;
  rejectedClaims: number;
  totalRefundAmount: number;
  paidRefunds: number;
  pendingRefunds: number;
}

export interface PolicyDistribution {
  policyName: string;
  subscriptionCount: number;
  percentage: number;
}

export interface MonthlyClaimsData {
  month: string;
  pendingClaims: number;
  approvedClaims: number;
  rejectedClaims: number;
}

export interface RecentClaim {
  id: number;
  userName: string;
  userImage: string;
  policyName: string;
  policyId: string;
  description: string;
  amount: number;
  date: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Helper function to get auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getDashboardStats(): Observable<DashboardStats> {
    const headers = this.getAuthHeaders();
    return this.http.get<DashboardStats>(`${this.baseUrl}/dashboard/stats`, { headers });
  }

  getPolicyDistribution(): Observable<PolicyDistribution[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<PolicyDistribution[]>(`${this.baseUrl}/dashboard/policy-distribution`, { headers });
  }

  getMonthlyClaimsData(): Observable<MonthlyClaimsData[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<MonthlyClaimsData[]>(`${this.baseUrl}/dashboard/monthly-claims`, { headers });
  }

  getRecentClaims(): Observable<RecentClaim[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<RecentClaim[]>(`${this.baseUrl}/dashboard/recent-claims`, { headers });
  }
}