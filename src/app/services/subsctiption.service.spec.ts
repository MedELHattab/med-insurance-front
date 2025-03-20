import { TestBed } from '@angular/core/testing'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubscriptionService, SubscriptionDTO, SubscriptionStatus } from './subscription.service';
import { getAuthHeaders } from '../auth.utils';

describe('SubscriptionService (Karma + Jasmine)', () => {
  let service: SubscriptionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Mock localStorage.getItem to return 'mockToken'
    spyOn(localStorage, 'getItem').and.returnValue('mockToken');
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscriptionService]
    });

    service = TestBed.inject(SubscriptionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no pending requests
  });

  it('should fetch all subscriptions', () => {
    const mockSubscriptions: SubscriptionDTO[] = [
      { id: 1, policyId: 101, userId: 10, status: SubscriptionStatus.ACTIVE }
    ];

    service.getAllSubscriptions().subscribe((subscriptions) => {
      expect(subscriptions).toEqual(mockSubscriptions);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockSubscriptions);
  });

  it('should fetch current user subscription', () => {
    const mockSubscription: SubscriptionDTO = { id: 1, policyId: 101, userId: 10, status: SubscriptionStatus.ACTIVE };

    service.getMySubscription().subscribe((subscription) => {
      expect(subscription).toEqual(mockSubscription);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/my-subscription`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubscription);
  });

  it('should subscribe to a policy', () => {
    const policyId = 101;
    const mockSubscription: SubscriptionDTO = { id: 1, policyId, status: SubscriptionStatus.ACTIVE };

    service.subscribeToPolicy(policyId).subscribe((subscription) => {
      expect(subscription).toEqual(mockSubscription);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/subscribe?policyId=${policyId}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockSubscription);
  });

  it('should cancel a subscription', () => {
    const subscriptionId = 1;

    service.cancelSubscription(subscriptionId).subscribe((response) => {
      expect(response).toEqual('Subscription canceled successfully');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${subscriptionId}/status?newStatus=CANCELED`);
    expect(req.request.method).toBe('PUT');
    req.flush('Subscription canceled successfully');
  });
});
