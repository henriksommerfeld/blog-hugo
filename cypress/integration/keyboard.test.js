/// <reference types="Cypress" />

context('Keyboard navigation', () => {
  before(() => {
    cy.visit('/')
  })

  beforeEach(() => {
    cy.viewport('macbook-15');
  });

  it('Should open about page', () => {
    cy.get('nav').findByText('About').click().url()
      .should('equal', Cypress.config().baseUrl + '/about/')
    cy.findByText('Contact Info').should('be.visible');
  })
})