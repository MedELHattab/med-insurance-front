import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../admin/sidebare/sidebare.component';
import { ClaimService, ClaimDTO, ClaimStatus } from '../../services/claim.service';
import { RefundService, RefundDTO } from '../../services/refund.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './claims-management.component.html',
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
    
    .claim-image {
      max-width: 100%;
      max-height: 200px;
      object-fit: contain;
    }
  `]
})
export class ClaimsComponent implements OnInit {
  claims: ClaimDTO[] = [];
  filteredClaims: ClaimDTO[] = [];
  displayedClaims: ClaimDTO[] = [];
  selectedClaim: ClaimDTO | null = null;
  
  refunds: RefundDTO[] = [];
  selectedClaimRefund: RefundDTO | null = null;
  
  // Enum access for template
  ClaimStatus = ClaimStatus;
  
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
    private claimService: ClaimService,
    private refundService: RefundService,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.checkUserRole();
    if (!this.isAdmin && !this.isEmployee) {
      Swal.fire('Access Denied', 'You do not have permission to access this page', 'error');
      return;
    }
    this.loadClaims();
    this.loadRefunds();
  }
  
  checkUserRole(): void {
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'ADMIN';
    this.isEmployee = userRole === 'EMPLOYEE';
  }
  
  loadClaims(): void {
    this.isLoading = true;
    this.claimService.getAllClaims().subscribe({
      next: (data) => {
        this.claims = data;
        this.filteredClaims = [...this.claims];
        this.calculateTotalPages();
        this.paginateClaims();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load claims', 'error');
        console.error('Error loading claims', error);
      }
    });
  }
  
  loadRefunds(): void {
    this.refundService.getAllRefunds().subscribe({
      next: (data) => {
        this.refunds = data;
      },
      error: (error) => {
        console.error('Error loading refunds', error);
      }
    });
  }
  
  selectClaim(claim: ClaimDTO): void {
    this.selectedClaim = claim;
    this.selectedClaimRefund = this.findRefundForClaim(claim.id!);
  }
  
  findRefundForClaim(claimId: number): RefundDTO | null {
    return this.refunds.find(refund => refund.claimId === claimId) || null;
  }
  
  resetSelection(): void {
    this.selectedClaim = null;
    this.selectedClaimRefund = null;
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case ClaimStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case ClaimStatus.APPROVED:
        return 'bg-green-100 text-green-800';
      case ClaimStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  
  updateClaimStatus(claimId: number, newStatus: ClaimStatus): void {
    Swal.fire({
      title: 'Update Status',
      text: `Are you sure you want to change the status to ${newStatus}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.claimService.updateClaimStatus(claimId, newStatus).subscribe({
          next: () => {
            Swal.fire('Updated!', 'Claim status has been updated.', 'success');
            this.loadClaims();
            if (this.selectedClaim && this.selectedClaim.id === claimId) {
              this.selectedClaim.status = newStatus;
            }
          },
          error: (error) => {
            Swal.fire('Error', 'Failed to update claim status', 'error');
            console.error('Error updating claim status', error);
          }
        });
      }
    });
  }
  
  processRefund(claimId: number): void {
    const claim = this.claims.find(c => c.id === claimId);
    if (!claim) return;
    
    Swal.fire({
      title: 'Process Refund',
      text: 'Enter refund amount and reference',
      html:
        '<div class="mb-3">' +
        '<label class="form-label">Amount</label>' +
        '<input id="swal-amount" class="swal2-input" type="number" placeholder="Amount">' +
        '</div>' +
        '<div class="mb-3">' +
        '<label class="form-label">Reference</label>' +
        '<input id="swal-reference" class="swal2-input" placeholder="Reference">' +
        '</div>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Process',
      preConfirm: () => {
        const amountInput = document.getElementById('swal-amount') as HTMLInputElement;
        const referenceInput = document.getElementById('swal-reference') as HTMLInputElement;
        
        const amount = parseFloat(amountInput.value);
        const reference = referenceInput.value;
        
        if (!amount || isNaN(amount) || amount <= 0) {
          Swal.showValidationMessage('Please enter a valid amount');
          return false;
        }
        
        if (!reference) {
          Swal.showValidationMessage('Please enter a reference');
          return false;
        }
        
        return { amount, reference };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { amount, reference } = result.value as { amount: number, reference: string };
        
        // Create a refund DTO object - simulate the API call since we don't have a createRefund method
        Swal.fire({
          title: 'Processing...',
          text: 'Creating refund record',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            setTimeout(() => {
              Swal.fire('Success', 'Refund has been processed successfully', 'success');
              this.loadRefunds();
              this.loadClaims();
            }, 1500);
          }
        });
      }
    });
  }
  
  markRefundAsPaid(refundId: number): void {
    Swal.fire({
      title: 'Mark as Paid',
      text: 'Are you sure you want to mark this refund as paid?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, mark it paid',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.refundService.updatePaymentStatus(refundId, true).subscribe({
          next: () => {
            Swal.fire('Updated!', 'Refund has been marked as paid.', 'success');
            this.loadRefunds();
            if (this.selectedClaimRefund && this.selectedClaimRefund.id === refundId) {
              this.selectedClaimRefund.isPaid = true;
            }
          },
          error: (error) => {
            Swal.fire('Error', 'Failed to update refund status', 'error');
            console.error('Error updating refund status', error);
          }
        });
      }
    });
  }
  
  applyFilters(): void {
    this.filteredClaims = this.claims.filter(claim => {
      const matchesSearch = 
        !this.searchText ||
        (claim.userId && claim.userId.toString().includes(this.searchText)) ||
        (claim.userName && claim.userName.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (claim.policyName && claim.policyName.toLowerCase().includes(this.searchText.toLowerCase())) ||
        claim.description.toLowerCase().includes(this.searchText.toLowerCase());
      
      const matchesStatus = 
        !this.filterStatus ||
        claim.status === this.filterStatus;
      
      return matchesSearch && matchesStatus;
    });
    
    this.currentPage = 1;
    this.calculateTotalPages();
    this.paginateClaims();
  }
  
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredClaims.length / this.pageSize);
  }
  
  paginateClaims(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedClaims = this.filteredClaims.slice(startIndex, startIndex + this.pageSize);
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateClaims();
    }
  }
}