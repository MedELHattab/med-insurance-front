import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  email: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }
  
  subscribeToNewsletter(): void {
    if (this.email && this.validateEmail(this.email)) {
      // Here you would typically call a service to subscribe the email
      console.log('Subscribing email:', this.email);
      // Reset the form
      this.email = '';
      // Show success message (in a real app, you might use a toast notification)
      alert('Thank you for subscribing to our newsletter!');
    } else {
      alert('Please enter a valid email address');
    }
  }
  
  private validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
}