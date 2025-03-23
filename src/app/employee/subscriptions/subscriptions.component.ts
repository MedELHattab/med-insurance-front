import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../admin/sidebare/sidebare.component';
import { SubscriptionService, SubscriptionDTO, SubscriptionStatus } from '../../services/subscription.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriptions',
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './subscriptions.component.html',
  styles: [`
    .loader {
      border: 3px solid #f3f3f3;
      border-radius: 50%;
      border-top: 3px solid #3730a3;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .truncate {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `]
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: SubscriptionDTO[] = [];
  filteredSubscriptions: SubscriptionDTO[] = [];
  displayedSubscriptions: SubscriptionDTO[] = [];
  selectedSubscription: SubscriptionDTO | null = null;
  
  // Enum access for template
  SubscriptionStatus = SubscriptionStatus;
  
  // User role tracking
  isAdmin = false;
  isEmployee = false;
  
  isLoading = false;
  searchText: string = '';
  filterStatus: string = '';
  
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  
  Math = Math;
  
  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.checkUserRole();
    if (!this.isAdmin && !this.isEmployee) {
      Swal.fire('Access Denied', 'You do not have permission to access this page', 'error');
      this.router.navigate(['/dashboard']);
      return;
    }
    this.loadSubscriptions();
  }
  
  checkUserRole(): void {
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'ADMIN';
    this.isEmployee = userRole === 'EMPLOYEE';
  }
  
  loadSubscriptions(): void {
    this.isLoading = true;
    this.subscriptionService.getAllSubscriptions().subscribe({
      next: (data) => {
        this.subscriptions = data;
        this.filteredSubscriptions = [...this.subscriptions];
        this.calculateTotalPages();
        this.paginateSubscriptions();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching subscriptions', error);
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load subscriptions', 'error');
      }
    });
  }
  
  selectSubscription(subscription: SubscriptionDTO): void {
    this.selectedSubscription = { ...subscription };
  }
  
  updateSubscriptionStatus(subscriptionId: number, newStatus: SubscriptionStatus): void {
    if (!this.isEmployee && !this.isAdmin) {
      Swal.fire('Error', 'You do not have permission to update subscription status', 'error');
      return;
    }
    
    this.isLoading = true;
    this.subscriptionService.updateSubscriptionStatus(subscriptionId, newStatus).subscribe({
      next: () => {
        const index = this.subscriptions.findIndex(s => s.id === subscriptionId);
        if (index !== -1) {
          this.subscriptions[index].status = newStatus;
        }
        
        if (this.selectedSubscription && this.selectedSubscription.id === subscriptionId) {
          this.selectedSubscription.status = newStatus;
        }
        
        this.applyFilters();
        this.isLoading = false;
        Swal.fire('Success', 'Subscription status updated successfully', 'success');
      },
      error: (error) => {
        console.error('Error updating subscription status', error);
        this.isLoading = false;
        Swal.fire('Error', error?.error?.message || 'Failed to update subscription status', 'error');
      }
    });
  }
  
  resetSelection(): void {
    this.selectedSubscription = null;
  }
  
  applyFilters(): void {
    this.filteredSubscriptions = this.subscriptions.filter(subscription => {
      // Apply status filter
      if (this.filterStatus && subscription.status !== this.filterStatus) {
        return false;
      }
      
      // Apply text search
      if (this.searchText) {
        const searchLower = this.searchText.toLowerCase();
        return (subscription.userName?.toLowerCase().includes(searchLower) || false) ||
               (subscription.policyName?.toLowerCase().includes(searchLower) || false);
      }
      
      return true;
    });
    
    this.calculateTotalPages();
    this.currentPage = 1;
    this.paginateSubscriptions();
  }
  
  calculateTotalPages(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filteredSubscriptions.length / this.pageSize));
  }
  
  paginateSubscriptions(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedSubscriptions = this.filteredSubscriptions.slice(startIndex, startIndex + this.pageSize);
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateSubscriptions();
    }
  }
  
  getStatusClass(status: SubscriptionStatus): string {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return 'bg-green-100 text-green-800';
      case SubscriptionStatus.CANCELED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}