Cypress.Commands.add('mockToken', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'mockToken');
    });
  });
  