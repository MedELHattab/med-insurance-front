import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, VerifyRequest } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent {
  verifyForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.verifyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      verificationCode: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.verifyForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      
      const verifyData: VerifyRequest = {
        email: this.verifyForm.value.email,
        verificationCode: this.verifyForm.value.verificationCode
      };

      this.authService.verifyEmail(verifyData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = response;
          
          Swal.fire({
            title: 'Verification Successful!',
            text: 'Your account has been verified. You can now log in.',
            icon: 'success',
            confirmButtonText: 'Proceed to Login'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/auth/login']);
            }
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Verification failed. Please try again.';
          console.error('Error during verification:', error);
          
          Swal.fire({
            title: 'Verification Failed',
            text: error.message || 'Please check your verification code and try again.',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      });
    } else {
      this.markFormGroupTouched(this.verifyForm);
      
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

  // Helper method to mark all form fields as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}