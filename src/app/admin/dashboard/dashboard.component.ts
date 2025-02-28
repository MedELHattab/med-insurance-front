// dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Add this import

import { SidebarComponent } from '../sidebare/sidebare.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent,HttpClientModule // Add this import
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  today: Date = new Date();
  
  // Dashboard metrics - in a real app, these would come from a service
  dashboardMetrics = {
    totalPolicies: 1234,
    policyGrowth: 12.5,
    premiumRevenue: 12345,
    revenueGrowth: 8.2,
    activeClaims: 156,
    claimsChange: -3.1,
    activeSubscriptions: 982,
    pendingRenewals: 45
  };
  
  // Mock data for charts would go here
  
  constructor() { }
}