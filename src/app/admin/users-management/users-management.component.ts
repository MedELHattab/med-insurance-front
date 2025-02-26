import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  newUser: any = {
    name: '',
    email: '',
    password: '',
    age: null,
    monthlyIncome: null,
    creditScore: null,
    role: 'USER'
  };
  updatedUser: any = { ...this.newUser };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  loadUserById(id: number): void {
    this.userService.getUserById(id).subscribe(
      (data: any) => {
        this.selectedUser = data;
        this.updatedUser = { ...data }; // Pre-populate the update form
      },
      (error) => {
        console.error('Error fetching user', error);
      }
    );
  }

  createUser(user: any): void {
    this.userService.createUser(user).subscribe(
      (data: any) => {
        console.log('User created:', data);
        this.loadUsers(); // Refresh the list
        this.newUser = { // Reset the form
          name: '',
          email: '',
          password: '',
          age: null,
          monthlyIncome: null,
          creditScore: null,
          role: 'USER'
        };
      },
      (error) => {
        console.error('Error creating user', error);
      }
    );
  }

  updateUser(id: number, user: any): void {
    this.userService.updateUser(id, user).subscribe(
      (data: any) => {
        console.log('User updated:', data);
        this.loadUsers(); // Refresh the list
      },
      (error) => {
        console.error('Error updating user', error);
      }
    );
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('User deleted');
        this.loadUsers(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }
}