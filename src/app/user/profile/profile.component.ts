import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../home/header/header.component';
import { FooterComponent } from '../../home/footer/footer.component';
import { UserService } from '../../services/user.service';
import { SubscriptionService, SubscriptionDTO } from '../../services/subscription.service';
import { PolicyService, PolicyDTO } from '../../services/policy.service';
import Swal from 'sweetalert2';

interface UserProfile {
  id?: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  dob?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    dob: ''
  };

  subscription: SubscriptionDTO | null = null;
  policyDetails: PolicyDTO | null = null;
  isLoading = true;
  isEditMode = false;
  isPasswordChangeMode = false;
  originalProfile: UserProfile | null = null;
  
  // Password change fields
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private policyService: PolicyService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadSubscriptionDetails();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.userService.getUserProfile().subscribe({
      next: (data: UserProfile) => {
        this.userProfile = data;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Error loading user profile:', error);
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'Failed to load your profile information. Please try again later.',
          icon: 'error'
        });
      }
    });
  }

  loadSubscriptionDetails(): void {
    this.subscriptionService.getMySubscription().subscribe({
      next: (data: SubscriptionDTO) => {
        this.subscription = data;
        if (data && data.policyId) {
          this.loadPolicyDetails(data.policyId);
        }
      },
      error: (error: unknown) => {
        console.error('Error loading subscription details:', error);
        // No need to show error to user as they might not have a subscription yet
      }
    });
  }

  loadPolicyDetails(policyId: number): void {
    this.policyService.getPolicyById(policyId).subscribe({
      next: (data: PolicyDTO) => {
        this.policyDetails = data;
      },
      error: (error: unknown) => {
        console.error('Error loading policy details:', error);
      }
    });
  }

  toggleEditMode(): void {
    if (!this.isEditMode) {
      // Enter edit mode
      this.originalProfile = { ...this.userProfile };
      this.isEditMode = true;
    } else {
      // Cancel edit mode
      if (this.originalProfile) {
        this.userProfile = { ...this.originalProfile };
      }
      this.isEditMode = false;
    }
  }

  togglePasswordChangeMode(): void {
    this.isPasswordChangeMode = !this.isPasswordChangeMode;
    if (!this.isPasswordChangeMode) {
      // Clear password fields when exiting password change mode
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }

  updateProfile(): void {
    this.userService.updateProfile(this.userProfile).subscribe({
      next: () => {
        this.isEditMode = false;
        this.originalProfile = null;
        Swal.fire({
          title: 'Success!',
          text: 'Your profile has been updated successfully.',
          icon: 'success'
        });
      },
      error: (error: unknown) => {
        console.error('Error updating profile:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to update your profile. Please try again later.',
          icon: 'error'
        });
      }
    });
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'New password and confirmation do not match.',
        icon: 'error'
      });
      return;
    }

    this.userService.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.togglePasswordChangeMode();
        Swal.fire({
          title: 'Success!',
          text: 'Your password has been changed successfully.',
          icon: 'success'
        });
      },
      error: (error: unknown) => {
        console.error('Error changing password:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to change your password. Please ensure your current password is correct.',
          icon: 'error'
        });
      }
    });
  }

  cancelSubscription(): void {
    if (!this.subscription || !this.subscription.id) return;

    Swal.fire({
      title: 'Cancel Subscription',
      text: 'Are you sure you want to cancel your subscription? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel my subscription',
      cancelButtonText: 'No, keep my subscription'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriptionService.cancelSubscription(this.subscription!.id!).subscribe({
          next: () => {
            Swal.fire({
              title: 'Subscription Canceled',
              text: 'Your subscription has been canceled successfully.',
              icon: 'success'
            });
            this.loadSubscriptionDetails(); // Reload subscription details
          },
          error: (error: unknown) => {
            console.error('Error canceling subscription:', error);
            Swal.fire({
              title: 'Error',
              text: 'Failed to cancel your subscription. Please try again later.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  getSubscriptionStatus(): string {
    return this.subscription?.status || 'No Active Subscription';
  }

  getSubscriptionStatusClass(): string {
    if (!this.subscription) return 'bg-gray-100 text-gray-800';

    switch (this.subscription.status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'CANCELED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  }
}