// users-management.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebare/sidebare.component';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  age: number;
  image?: string;
  role: string;
  enabled?: boolean;
}

interface FormError {
  name?: string;
  email?: string;
  password?: string;
  age?: string;
  role?: string;
}

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedUsers: User[] = [];
  selectedUser: User | null = null;
  
  newUser: User = { name: '', email: '', password: '', age: 18, role: 'CLIENT' };
  updatedUser: User = { name: '', email: '', password: '', age: 18, role: 'CLIENT' };
    
  formErrors: FormError = {};
  
  isLoading = false;
  searchText: string = '';
  filterRole: string = '';
  
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
    
  Math = Math;
  
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = [...this.users]; // Initialize filteredUsers with all users
        this.calculateTotalPages();
        this.paginateUsers(); // Display the first page of users
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching users', error);
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load users', 'error');
      }
    });
  }
  
  loadUserById(id: number): void {
    this.isLoading = true;
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.selectedUser = data;
        this.updatedUser = { ...data };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching user', error);
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load user details', 'error');
      }
    });
  }
  
  validateNewUser(): boolean {
    this.formErrors = {};
    let isValid = true;
    
    // Validate name
    if (!this.newUser.name || this.newUser.name.trim() === '') {
      this.formErrors.name = 'Name is required';
      isValid = false;
    }
    
    // Validate email
    if (!this.newUser.email || this.newUser.email.trim() === '') {
      this.formErrors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.newUser.email)) {
      this.formErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    // Validate password
    if (!this.newUser.password || this.newUser.password.trim() === '') {
      this.formErrors.password = 'Password is required';
      isValid = false;
    } else if (this.newUser.password.length < 6) {
      this.formErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    // Validate age
    if (!this.newUser.age) {
      this.formErrors.age = 'Age is required';
      isValid = false;
    } else if (this.newUser.age < 18) {
      this.formErrors.age = 'Age must be at least 18';
      isValid = false;
    }
    
    // Validate role
    if (!this.newUser.role) {
      this.formErrors.role = 'Role is required';
      isValid = false;
    }
    
    return isValid;
  }
  
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  
  createUser(user: User): void {
    if (!this.validateNewUser()) {
      return;
    }
    
    this.isLoading = true;
    // Ensure age is parsed as a number
    const userToCreate = {
      ...user,
      age: Number(user.age)
    };
    
    this.userService.createUser(userToCreate).subscribe({
      next: (data) => {
        this.users.push(data);
        this.newUser = { name: '', email: '', password: '', age: 18, role: 'CLIENT' };
        this.applyFilters(); // Reapply filters to include the new user
        this.isLoading = false;
        Swal.fire('Success', 'User created successfully', 'success');
      },
      error: (error) => {
        console.error('Error creating user', error);
        this.isLoading = false;
        Swal.fire('Error', error?.error?.message || 'Failed to create user', 'error');
      }
    });
  }
  
  updateUser(id: number, user: User): void {
    this.isLoading = true;
    
    // Ensure age is parsed as a number
    const userToUpdate = {
      ...user,
      age: Number(user.age)
    };
    
    this.userService.updateUser(id, userToUpdate).subscribe({
      next: (data) => {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
          this.users[index] = data;
        }
        this.selectedUser = null;
        this.applyFilters(); // Reapply filters to reflect the updated user
        this.isLoading = false;
        Swal.fire('Success', 'User updated successfully', 'success');
      },
      error: (error) => {
        console.error('Error updating user', error);
        this.isLoading = false;
        Swal.fire('Error', error?.error?.message || 'Failed to update user', 'error');
      }
    });
  }
  
  deleteUser(id: number): void {
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
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.users = this.users.filter(user => user.id !== id);
            this.applyFilters(); // Reapply filters to remove the deleted user
            this.isLoading = false;
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting user', error);
            this.isLoading = false;
            Swal.fire('Error', 'Failed to delete user', 'error');
          }
        });
      }
    });
  }
  
  resetForm(): void {
    this.selectedUser = null;
  }
  
  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      // Apply role filter
      if (this.filterRole && user.role !== this.filterRole) {
        return false;
      }
      
      // Apply text search
      if (this.searchText) {
        const searchLower = this.searchText.toLowerCase();
        return user.name.toLowerCase().includes(searchLower) ||
               user.email.toLowerCase().includes(searchLower);
      }
      
      return true;
    });
    
    this.calculateTotalPages();
    this.currentPage = 1; // Reset to first page when filters change
    this.paginateUsers();
  }
  
  calculateTotalPages(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filteredUsers.length / this.pageSize));
  }
  
  paginateUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateUsers();
    }
  }
  
  toggleUserStatus(userId: number): void {
    this.isLoading = true;
    this.userService.toggleUserEnabled(userId).subscribe({
      next: (updatedUser) => {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
          this.users[userIndex].enabled = updatedUser.enabled;
          
          // Update the user in filteredUsers and displayedUsers as well
          const filteredIndex = this.filteredUsers.findIndex(user => user.id === userId);
          if (filteredIndex !== -1) {
            this.filteredUsers[filteredIndex].enabled = updatedUser.enabled;
          }
          
          const displayedIndex = this.displayedUsers.findIndex(user => user.id === userId);
          if (displayedIndex !== -1) {
            this.displayedUsers[displayedIndex].enabled = updatedUser.enabled;
          }
        }
        this.isLoading = false;
        Swal.fire('Success', `User ${updatedUser.enabled ? 'activated' : 'deactivated'} successfully`, 'success');
      },
      error: (error) => {
        console.error('Error toggling user status', error);
        this.isLoading = false;
        Swal.fire('Error', 'Failed to update user status', 'error');
      }
    });
  }
}