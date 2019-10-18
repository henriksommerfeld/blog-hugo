/// <reference types="Cypress" />

context('About', () => {
    before(() => {
      cy.visit('/')
    })

    it('Should open about page', ()=> {
        cy.get('nav').findByText('About').click().url()
          .should('equal', Cypress.config().baseUrl +  '/about/')
        
    })
})