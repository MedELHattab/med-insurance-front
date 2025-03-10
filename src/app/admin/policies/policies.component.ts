import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebare/sidebare.component';
import { PolicyService, PolicyDTO, PolicyStatus } from '../../services/policy.service';
import Swal from 'sweetalert2';

interface FormError {
  name?: string;
  description?: string;
  percentage?: string;
}

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './policies.component.html',
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
export class PoliciesComponent implements OnInit {
  policies: PolicyDTO[] = [];
  filteredPolicies: PolicyDTO[] = [];
  displayedPolicies: PolicyDTO[] = [];
  selectedPolicy: PolicyDTO | null = null;
  
  // PolicyStatus enum accessible in the template
  PolicyStatus = PolicyStatus;
  
  newPolicy: PolicyDTO = { 
    name: '', 
    description: '', 
    percentage: 0, 
    status: PolicyStatus.ACTIVE
  };
  
  updatedPolicy: PolicyDTO = { 
    name: '', 
    description: '', 
    percentage: 0,
    status: PolicyStatus.ACTIVE
  };
  
  formErrors: FormError = {};
  
  isLoading = false;
  searchText: string = '';
  
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  
  Math = Math;
  
  constructor(private policyService: PolicyService) { }
  
  ngOnInit(): void {
    this.loadPolicies();
  }
  
  loadPolicies(): void {
    this.isLoading = true;
    this.policyService.getAllPolicies().subscribe({
      next: (data) => {
        this.policies = data;
        this.filteredPolicies = [...this.policies];
        this.calculateTotalPages();
        this.paginatePolicies();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching policies', error);
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load policies', 'error');
      }
    });
  }
  
  loadPolicyById(id: number): void {
    this.isLoading = true;
    this.policyService.getPolicyById(id).subscribe({
      next: (data) => {
        this.selectedPolicy = data;
        this.updatedPolicy = { ...data };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching policy', error);
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load policy details', 'error');
      }
    });
  }
  
  validatePolicy(policy: PolicyDTO): boolean {
    this.formErrors = {};
    let isValid = true;
    
    if (!policy.name || policy.name.trim() === '') {
      this.formErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!policy.description || policy.description.trim() === '') {
      this.formErrors.description = 'Description is required';
      isValid = false;
    }
    
    if (policy.percentage < 0 || policy.percentage > 100) {
      this.formErrors.percentage = 'Coverage percentage must be between 0 and 100';
      isValid = false;
    }
    
    return isValid;
  }
  
  createPolicy(policy: PolicyDTO): void {
    if (!this.validatePolicy(policy)) {
      return;
    }
    
    this.isLoading = true;
    const policyToCreate = {
      ...policy,
      percentage: Number(policy.percentage)
    };
    
    this.policyService.createPolicy(policyToCreate).subscribe({
      next: (data) => {
        this.policies.push(data);
        this.newPolicy = { 
          name: '', 
          description: '', 
          percentage: 0, 
          status: PolicyStatus.ACTIVE
        };
        this.applyFilters();
        this.isLoading = false;
        Swal.fire('Success', 'Policy created successfully', 'success');
      },
      error: (error) => {
        console.error('Error creating policy', error);
        this.isLoading = false;
        Swal.fire('Error', error?.error?.message || 'Failed to create policy', 'error');
      }
    });
  }
  
  updatePolicy(id: number, policy: PolicyDTO): void {
    if (!this.validatePolicy(policy)) {
      return;
    }
    
    this.isLoading = true;
    const policyToUpdate = {
      ...policy,
      percentage: Number(policy.percentage)
    };
    
    this.policyService.updatePolicy(id, policyToUpdate).subscribe({
      next: (data) => {
        const index = this.policies.findIndex(p => p.id === id);
        if (index !== -1) {
          this.policies[index] = data;
        }
        this.selectedPolicy = null;
        this.applyFilters();
        this.isLoading = false;
        Swal.fire('Success', 'Policy updated successfully', 'success');
      },
      error: (error) => {
        console.error('Error updating policy', error);
        this.isLoading = false;
        Swal.fire('Error', error?.error?.message || 'Failed to update policy', 'error');
      }
    });
  }
  
  deletePolicy(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.policyService.deletePolicy(id).subscribe({
          next: () => {
            this.policies = this.policies.filter(policy => policy.id !== id);
            this.applyFilters();
            this.isLoading = false;
            Swal.fire('Deleted!', 'Policy has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting policy', error);
            this.isLoading = false;
            Swal.fire('Error', 'Failed to delete policy', 'error');
          }
        });
      }
    });
  }
  
  resetForm(): void {
    this.selectedPolicy = null;
  }
  
  togglePolicyStatus(policy: PolicyDTO): void {
    if (!policy.id) return;
    
    const updatedPolicy = {
      ...policy,
      status: policy.status === PolicyStatus.ACTIVE ? PolicyStatus.DISABLED : PolicyStatus.ACTIVE
    };
    
    this.updatePolicy(policy.id, updatedPolicy);
  }
  
  applyFilters(): void {
    this.filteredPolicies = this.policies.filter(policy => {
      // Apply text search
      if (this.searchText) {
        const searchLower = this.searchText.toLowerCase();
        return policy.name.toLowerCase().includes(searchLower) ||
               policy.description.toLowerCase().includes(searchLower);
      }
      
      return true;
    });
    
    this.calculateTotalPages();
    this.currentPage = 1;
    this.paginatePolicies();
  }
  
  calculateTotalPages(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filteredPolicies.length / this.pageSize));
  }
  
  paginatePolicies(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedPolicies = this.filteredPolicies.slice(startIndex, startIndex + this.pageSize);
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginatePolicies();
    }
  }
}