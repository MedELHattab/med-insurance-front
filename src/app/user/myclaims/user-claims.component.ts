import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaimService, ClaimDTO, ClaimStatus } from '../../services/claim.service';
import { HeaderComponent } from '../../home/header/header.component';
import { FooterComponent } from '../../home/footer/footer.component';
import Swal from 'sweetalert2';

// Refund interface
interface RefundDTO {
  id?: number;
  claimId: number;
  amount: number;
  reference?: string;
  createdAt?: string;
  isPaid: boolean;
}

@Component({
  selector: 'app-user-claims',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './user-claims.component.html',
  styleUrls: ['./user-claims.component.css']
})
export class UserClaimsComponent implements OnInit {
  claims: ClaimDTO[] = [];
  isLoading = true;
  submitClaimForm: FormGroup;
  showSubmitForm = false;
  
  // For image handling
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  
  // For claim details view
  selectedClaimId: number | null = null;
  selectedClaim: ClaimDTO | null = null;
  refund: RefundDTO | null = null;
  
  constructor(
    private claimService: ClaimService,
    private fb: FormBuilder
  ) {
    this.submitClaimForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadUserClaims();
  }

  loadUserClaims(): void {
    this.isLoading = true;
    this.claimService.getAllClaimsByUser().subscribe({
      next: (data) => {
        this.claims = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading claims:', error);
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'Failed to load your claims. Please try again later.',
          icon: 'error'
        });
      }
    });
  }

  toggleSubmitForm(): void {
    this.showSubmitForm = !this.showSubmitForm;
    if (!this.showSubmitForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.submitClaimForm.reset();
    this.selectedFile = null;
    this.imagePreview = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (!input.files || input.files.length === 0) {
      return;
    }
    
    this.selectedFile = input.files[0];
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  submitClaim(): void {
    if (this.submitClaimForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.submitClaimForm.controls).forEach(key => {
        this.submitClaimForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Create FormData with exactly the fields expected by the backend
    const formData = new FormData();
    
    // Required parameters
    formData.append('description', this.submitClaimForm.get('description')?.value);
    formData.append('amount', this.submitClaimForm.get('amount')?.value);
    
    // Optional image parameter
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    
    this.claimService.submitClaimWithImage(formData).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success',
          text: 'Your claim has been submitted successfully!',
          icon: 'success'
        });
        this.toggleSubmitForm();
        this.loadUserClaims(); // Reload claims list
      },
      error: (error) => {
        console.error('Error submitting claim:', error);
        let errorMessage = 'Failed to submit your claim. Please try again later.';
        
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        }
        
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error'
        });
      }
    });
  }

  viewClaimDetails(claimId: number): void {
    this.isLoading = true;
    this.selectedClaimId = claimId;
    
    // Find the claim in our existing data
    this.selectedClaim = this.claims.find(claim => claim.id === claimId) || null;
    
    // In a real application, you would fetch refund information here
    // Since your service doesn't have a method for this yet, we'll simulate it
    setTimeout(() => {
      // Mock refund data for approved claims only
      if (this.selectedClaim?.status === ClaimStatus.APPROVED) {
        this.refund = {
          id: 1,
          claimId: claimId,
          amount: 250,
          reference: 'REF-' + Math.floor(Math.random() * 10000),
          createdAt: new Date().toISOString(),
          isPaid: Math.random() > 0.5
        };
      } else {
        this.refund = null;
      }
      this.isLoading = false;
    }, 500);
  }

  closeClaimDetails(): void {
    this.selectedClaimId = null;
    this.selectedClaim = null;
    this.refund = null;
  }

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case ClaimStatus.APPROVED:
        return 'bg-green-100 text-green-800';
      case ClaimStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case ClaimStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  calculateRefundAmount(claim: ClaimDTO): number {
    // Since your ClaimDTO doesn't have amount or policyCoverage properties,
    // we'll use a simpler calculation based on the claim ID
    if (!claim || typeof claim.id !== 'number') return 0;
    
    // Mock calculation (claim ID × 50 for demo purposes)
    return claim.id * 50;
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) return '';
    return this.claimService.getImageUrl(imagePath);
  }
}