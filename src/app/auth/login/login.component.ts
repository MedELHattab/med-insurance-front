import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  isComponentReady = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize form but don't show it yet
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    // Simulate loading delay (you can remove this in production)
    setTimeout(() => {
      this.isComponentReady = true;
    }, 1000);
    
    // If you need to fetch data before showing the form:
    /*
    this.someService.getData().subscribe({
      next: (data) => {
        // Process data if needed
        this.isComponentReady = true;
      },
      error: (error) => {
        console.error('Error loading component data', error);
        this.isComponentReady = true; // Show the form anyway
        
        // Optional: Show error message
        Swal.fire({
          title: 'Warning',
          text: 'Some data could not be loaded. You can continue, but some features may be limited.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      }
    });
    */
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Login successful');
          
          // Redirect based on role
          const role = this.authService.getUserRole();
          switch (role) {
            case 'ADMIN':
              this.router.navigate(['admin/dashboard']);
              break;
            case 'USER':
              this.router.navigate(['/user/profile']);
              break;
            case 'EMPLOYEE':
              this.router.navigate(['admin/dashboard']);
              break;
            default:
              this.router.navigate(['/home']);
              break;
          }
          
          Swal.fire({
            title: 'Success!',
            text: 'You have logged in successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login failed', error);
          
          // Display the exact error message from the server
          Swal.fire({
            title: 'Login Failed',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Try Again',
          });
          
          // If the error indicates account is not verified, offer to navigate to verification
          if (error.message.includes('not verified') || error.message.includes('verification')) {
            Swal.fire({
              title: 'Account Not Verified',
              text: 'Your account needs verification. Would you like to go to the verification page?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Go to Verification',
              cancelButtonText: 'Stay Here'
            }).then((result) => {
              if (result.isConfirmed) {
                // Store email for verification page
                localStorage.setItem('registrationEmail', email);
                this.router.navigate(['/auth/verify']);
              }
            });
          }
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
      
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill in the required fields correctly.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }
  
  /**
   * Marks all form controls as touched to trigger validation messages
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}