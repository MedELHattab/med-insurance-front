import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebare.component.html',
})
export class SidebarComponent implements OnInit {
  isAdmin = false;
  isEmployee = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkUserRole();
  }

  checkUserRole() {
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'ADMIN';
    this.isEmployee = userRole === 'EMPLOYEE';
  }

  logout() {
    this.authService.logout();
    window.location.href = '/auth/login';
  }
}