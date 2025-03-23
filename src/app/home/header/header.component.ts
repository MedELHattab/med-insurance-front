import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, UserData } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isUserMenuOpen = false;
  isAuthenticated = false;
  user: UserData | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    // Subscribe to auth status changes to update the UI accordingly
    this.authService.authStatusChanged.subscribe(() => {
      this.checkAuthStatus();
    });
  }

  checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.user = this.authService.getCurrentUser();
    } else {
      this.user = null;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Close user menu if it's open
    if (this.isMenuOpen) {
      this.isUserMenuOpen = false;
    }
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isUserMenuOpen = false;
    this.router.navigate(['/']);
  }

  // Close user menu when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const userMenuBtn = document.querySelector('.user-menu-btn');
    const userMenu = document.querySelector('.user-dropdown');
    
    if (this.isUserMenuOpen && 
        userMenuBtn && 
        userMenu && 
        !userMenuBtn.contains(event.target as Node) && 
        !userMenu.contains(event.target as Node)) {
      this.isUserMenuOpen = false;
    }
  }
}