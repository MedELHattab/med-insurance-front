import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService, RegisterRequest } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  isComponentReady = false;
  
  // Image upload properties
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  imageError: string | null = null;
  
  // Maximum file size (2MB)
  private maxFileSize = 2 * 1024 * 1024;
  private allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize form but don't show it yet
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18)]]
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

  /**
   * Handles file selection for profile image upload
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (!input.files || input.files.length === 0) {
      return;
    }
    
    const file = input.files[0];
    this.imageError = null;
    
    // Validate file type
    if (!this.allowedFileTypes.includes(file.type)) {
      this.imageError = 'Only JPEG, JPG and PNG files are allowed';
      return;
    }
    
    // Validate file size
    if (file.size > this.maxFileSize) {
      this.imageError = 'File size cannot exceed 2MB';
      return;
    }
    
    this.selectedFile = file;
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  /**
   * Removes the selected image
   */
  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  /**
   * Submits the registration form
   */
  onSubmit(): void {
    // Mark all form controls as touched to show validation errors
    this.markFormGroupTouched(this.registerForm);
    
    // Check if form is valid and image is selected
    if (!this.registerForm.valid) {
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    if (!this.selectedFile) {
      Swal.fire({
        title: 'Profile Image Required',
        text: 'Please upload a profile image to continue.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    this.isLoading = true;
    
    const userData: RegisterRequest = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      age: this.registerForm.value.age
    };
    
    // Use the AuthService's register method with the image
    this.authService.register(userData, this.selectedFile).subscribe({
      next: (response) => {
        console.log('Registration response:', response);
        this.isLoading = false;
        
        // Store the email for verification page
        localStorage.setItem('registrationEmail', userData.email);
        
        Swal.fire({
          title: 'Registration Successful!',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'Proceed to Verification'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/auth/verify']);
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration failed', error);
        
        // Display the exact error message from the server
        Swal.fire({
          title: 'Registration Failed',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    });
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