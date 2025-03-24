import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PolicyService, PolicyDTO, PolicyStatus } from '../../services/policy.service';
import { SubscriptionService, SubscriptionDTO } from '../../services/subscription.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('policiesSlider') policiesSlider!: ElementRef;

  policies: PolicyDTO[] = [];
  isLoading = false;
  activeSlideIndex = 0;
  totalSlides = 0;
  isAuthenticated = false;
  currentUserSubscription: SubscriptionDTO | null = null;


  // Features section data
  features = [
    {
      icon: 'fa-solid fa-shield-heart',
      title: 'Comprehensive Coverage',
      description: 'Get full coverage for hospital visits, medications, and specialist consultations.'
    },
    {
      icon: 'fa-solid fa-money-bill-wave',
      title: 'Affordable Policies',
      description: 'Flexible pricing options to fit every budget without compromising on quality.'
    },
    {
      icon: 'fa-solid fa-clock',
      title: 'Fast Claims Processing',
      description: 'Our streamlined system ensures quick approval and payment of valid claims.'
    },
    {
      icon: 'fa-solid fa-user-doctor',
      title: 'Network of Specialists',
      description: 'Access to a wide network of qualified healthcare professionals.'
    }
  ];

  // Testimonials data
  testimonials = [
    {
      quote: "MedInsurance helped me get the treatment I needed without worrying about the costs. Their customer service was exceptional throughout my recovery.",
      author: "Sarah Johnson",
      role: "Customer since 2021"
    },
    {
      quote: "I've never had such a smooth experience with insurance claims. The online portal makes everything so easy to manage.",
      author: "Michael Chen",
      role: "Customer since 2020"
    },
    {
      quote: "As a family of five, healthcare costs were always a concern. MedInsurance provided us with affordable coverage that meets all our needs.",
      author: "Emma Rodriguez",
      role: "Customer since 2022"
    }
  ];

  // FAQ section data
  faqs = [
    {
      question: "How quickly can I get coverage?",
      answer: "Most policies can be activated within 24-48 hours after application approval. Emergency coverage options are also available for immediate needs.",
      open: false
    },
    {
      question: "What does the basic policy cover?",
      answer: "Our basic policy includes hospital stays, emergency services, preventive care, and prescription medications. Detailed coverage information is available in your policy documents.",
      open: false
    },
    {
      question: "How do I submit a claim?",
      answer: "Claims can be submitted through our online portal, mobile app, or by contacting our customer service team. We typically process claims within 5-7 business days.",
      open: false
    },
    {
      question: "Can I add family members to my policy?",
      answer: "Yes, you can add dependents to your policy including spouse and children. Family policies offer comprehensive coverage at discounted rates.",
      open: false
    }
  ];

  constructor(
    private policyService: PolicyService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.loadPolicies();
    
    if (this.isAuthenticated) {
      this.loadUserSubscription();
    }
  }

  loadPolicies(): void {
    this.isLoading = true;
    this.policyService.getActivePolicies().subscribe({
      next: (data: PolicyDTO[]) => {
        // Only show active policies
        this.policies = data.filter(policy => policy.status === PolicyStatus.ACTIVE);
        this.totalSlides = this.policies.length;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Error loading policies:', error);
        this.isLoading = false;
      }
    });
  }

  loadUserSubscription(): void {
    this.subscriptionService.getMySubscription().subscribe({
      next: (data: SubscriptionDTO) => {
        this.currentUserSubscription = data;
      },
      error: (error: unknown) => {
        // User might not have a subscription yet, which is fine
        console.error('Error loading user subscription:', error);
      }
    });
  }

  nextSlide(): void {
    if (this.activeSlideIndex < this.totalSlides - 1) {
      this.activeSlideIndex++;
      this.scrollSlider();
    }
  }

  prevSlide(): void {
    if (this.activeSlideIndex > 0) {
      this.activeSlideIndex--;
      this.scrollSlider();
    }
  }

  setSlide(index: number): void {
    if (index >= 0 && index < this.totalSlides) {
      this.activeSlideIndex = index;
      this.scrollSlider();
    }
  }

  scrollSlider(): void {
    if (this.policiesSlider && this.policiesSlider.nativeElement) {
      const slideWidth = this.policiesSlider.nativeElement.offsetWidth;
      const scrollPosition = this.activeSlideIndex * slideWidth;
      this.policiesSlider.nativeElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }

  subscribeToPolicy(policyId: number): void {
    if (!this.isAuthenticated) {
      Swal.fire({
        title: 'Sign In Required',
        text: 'You need to sign in to subscribe to a policy',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sign In',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to login page
          window.location.href = '/login';
        }
      });
      return;
    }

    // If user already has a subscription
    if (this.currentUserSubscription) {
      // If subscribing to the same policy
    
      if (this.currentUserSubscription.policyId == policyId) {
        Swal.fire({
          title: 'Already Subscribed',
          text: 'You are already subscribed to this policy',
          icon: 'info'
        });
        return;
      }

      // If upgrading to a different policy
      Swal.fire({
        title: 'Upgrade Subscription',
        text: 'Would you like to upgrade your current subscription to this policy?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Upgrade',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.upgradeSubscription(policyId);
        }
      });
    } else {
      // New subscription
      this.createNewSubscription(policyId);
    }
  }

  createNewSubscription(policyId: number): void {
    this.subscriptionService.subscribeToPolicy(policyId).subscribe({
      next: (result: SubscriptionDTO) => {
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully subscribed to the policy',
          icon: 'success'
        });
        this.currentUserSubscription = result;
      },
      error: (error: unknown) => {
        Swal.fire({
          title: 'Error',
          text: 'There was a problem subscribing to the policy. Please try again later.',
          icon: 'error'
        });
        console.error('Error subscribing to policy:', error);
      }
    });
  }

  upgradeSubscription(newPolicyId: number): void {
    this.subscriptionService.upgradeSubscription(newPolicyId).subscribe({
      next: (result: SubscriptionDTO) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your subscription has been upgraded successfully',
          icon: 'success'
        });
        this.currentUserSubscription = result;
      },
      error: (error: unknown) => {
        Swal.fire({
          title: 'Error',
          text: 'There was a problem upgrading your subscription. Please try again later.',
          icon: 'error'
        });
        console.error('Error upgrading subscription:', error);
      }
    });
  }

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }
  
  // Contact form methods
  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form submitted:', form.value);
      form.reset();
      Swal.fire({
        title: 'Message Sent!',
        text: 'Thank you for your message! We will get back to you soon.',
        icon: 'success'
      });
    }
  }

  isPolicyActive(policyId: number): boolean {
    return this.currentUserSubscription !== null && 
           this.currentUserSubscription.policyId === policyId && 
           this.currentUserSubscription.status === 'ACTIVE';
  }
}