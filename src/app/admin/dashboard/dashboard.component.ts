import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebare/sidebare.component';
import { 
  DashboardService, 
  DashboardStats, 
  PolicyDistribution, 
  MonthlyClaimsData, 
  RecentClaim 
} from '../../services/dashboard.service';
import { Chart, ChartConfiguration, TooltipItem } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  today = new Date();
  isLoading = true;
  stats: DashboardStats | null = null;
  policyDistribution: PolicyDistribution[] = [];
  monthlyClaimsData: MonthlyClaimsData[] = [];
  recentClaims: RecentClaim[] = [];
  
  // Charts
  claimsChart: Chart | undefined;
  policyChart: Chart | undefined;
  
  // Time period selectors
  claimsTimePeriod: 'weekly' | 'monthly' = 'monthly';
  policyTimePeriod: 'thisYear' | 'lastYear' = 'thisYear';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    
    // Load stats
    this.dashboardService.getDashboardStats().subscribe({
      next: (data: DashboardStats) => {
        this.stats = data;
        this.isLoading = false;
      },
      error: (error: Error) => {
        console.error('Error loading dashboard stats:', error);
        this.isLoading = false;
      }
    });
    
    // Load policy distribution
    this.dashboardService.getPolicyDistribution().subscribe({
      next: (data: PolicyDistribution[]) => {
        this.policyDistribution = data;
        this.initPolicyChart();
      },
      error: (error: Error) => {
        console.error('Error loading policy distribution:', error);
      }
    });
    
    // Load monthly claims data
    this.dashboardService.getMonthlyClaimsData().subscribe({
      next: (data: MonthlyClaimsData[]) => {
        this.monthlyClaimsData = data;
        this.initClaimsChart();
      },
      error: (error: Error) => {
        console.error('Error loading monthly claims data:', error);
      }
    });
    
    // Load recent claims
    this.dashboardService.getRecentClaims().subscribe({
      next: (data: RecentClaim[]) => {
        this.recentClaims = data;
      },
      error: (error: Error) => {
        console.error('Error loading recent claims:', error);
      }
    });
  }

  initClaimsChart(): void {
    if (this.claimsChart) {
      this.claimsChart.destroy();
    }
    
    const ctx = document.getElementById('claimsChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    const labels = this.monthlyClaimsData.map(item => item.month);
    const pendingData = this.monthlyClaimsData.map(item => item.pendingClaims);
    const approvedData = this.monthlyClaimsData.map(item => item.approvedClaims);
    const rejectedData = this.monthlyClaimsData.map(item => item.rejectedClaims);
    
    this.claimsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Approved Claims',
            data: approvedData,
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 2,
            tension: 0.3
          },
          {
            label: 'Pending Claims',
            data: pendingData,
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 2,
            tension: 0.3
          },
          {
            label: 'Rejected Claims',
            data: rejectedData,
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 2,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  initPolicyChart(): void {
    if (this.policyChart) {
      this.policyChart.destroy();
    }
    
    const ctx = document.getElementById('policyChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    const labels = this.policyDistribution.map(item => item.policyName);
    const data = this.policyDistribution.map(item => item.subscriptionCount);
    
    // Generate a different color for each policy
    const backgroundColors = this.generateColors(this.policyDistribution.length);
    
    const component = this; // Save reference to component for use in tooltip callback
    
    this.policyChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context: TooltipItem<'doughnut'>) {
                const label = context.label || '';
                const value = context.formattedValue;
                const index = context.dataIndex;
                const percentage = component.policyDistribution[index]?.percentage;
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      } as ChartConfiguration<'doughnut'>['options']
    });
  }

  generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      // Generate colors in HSL for better distribution
      const hue = (i * 360) / count;
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
  }

  changeClaimsTimePeriod(period: 'weekly' | 'monthly'): void {
    this.claimsTimePeriod = period;
    // In a real implementation, you would reload data for the selected period
    // For now, we'll just re-initialize the chart with the same data
    this.initClaimsChart();
  }

  changePolicyTimePeriod(period: 'thisYear' | 'lastYear'): void {
    this.policyTimePeriod = period;
    // In a real implementation, you would reload data for the selected period
    // For now, we'll just re-initialize the chart with the same data
    this.initPolicyChart();
  }

  getClaimStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
}