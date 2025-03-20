describe('Subscription End-to-End Tests', () => {
  
    beforeEach(() => {
      // Mock the localStorage to simulate the presence of a token
      cy.window().then((win) => {
        win.localStorage.setItem('token', 'mockToken');
      });
    });
  
    it('should fetch all subscriptions', () => {
      // Visit the page where the subscription list is displayed
      cy.visit('/subscriptions'); // Replace with your actual URL
  
      // Intercept the HTTP request and mock the response
      cy.intercept('GET', '/api/subscriptions', {
        statusCode: 200,
        body: [
          { id: 1, policyId: 101, userId: 10, status: 'ACTIVE' }
        ]
      }).as('getSubscriptions');
  
      // Wait for the request and assert the results
      cy.wait('@getSubscriptions').then((interception) => {
        expect(interception.response.body).to.have.length(1);
        expect(interception.response.body[0].status).to.equal('ACTIVE');
      });
  
      // Verify the displayed subscription on the page
      cy.get('.subscription-list') // Replace with the actual selector
        .should('contain', 'ACTIVE')
        .and('contain', 'Policy 101');
    });
  
    it('should subscribe to a policy', () => {
      const policyId = 101;
  
      cy.visit('/subscribe'); // Replace with your actual URL for subscribing
  
      // Intercept the POST request to subscribe and mock the response
      cy.intercept('POST', `/api/subscribe?policyId=${policyId}`, {
        statusCode: 200,
        body: { id: 1, policyId, status: 'ACTIVE' }
      }).as('subscribeToPolicy');
  
      // Simulate the action to subscribe
      cy.get('button#subscribe').click(); // Replace with the actual selector for the button
  
      // Wait for the POST request and assert the response
      cy.wait('@subscribeToPolicy').then((interception) => {
        expect(interception.response.body.policyId).to.equal(policyId);
        expect(interception.response.body.status).to.equal('ACTIVE');
      });
  
      // Verify the UI updates after subscribing
      cy.get('.subscription-status') // Replace with the actual selector
        .should('contain', 'Subscribed')
        .and('contain', `Policy ID: ${policyId}`);
    });
  
    it('should cancel a subscription', () => {
      const subscriptionId = 1;
  
      cy.visit(`/subscriptions/${subscriptionId}`); // Replace with actual URL to view a subscription
  
      // Intercept the PUT request to cancel the subscription and mock the response
      cy.intercept('PUT', `/api/subscriptions/${subscriptionId}/status?newStatus=CANCELED`, {
        statusCode: 200,
        body: 'Subscription canceled successfully'
      }).as('cancelSubscription');
  
      // Simulate the cancel action
      cy.get('button#cancel-subscription').click(); // Replace with actual selector for cancel button
  
      // Wait for the PUT request and assert the response
      cy.wait('@cancelSubscription').then((interception) => {
        expect(interception.response.body).to.equal('Subscription canceled successfully');
      });
  
      // Verify the UI reflects the cancellation
      cy.get('.subscription-status') // Replace with the actual selector
        .should('contain', 'Canceled');
    });
  });
  