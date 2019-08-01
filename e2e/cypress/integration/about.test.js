/// <reference types="Cypress" />

context('About', () => {
    before(() => {
      cy.visit('/')
    })

    it('Should open about page', ()=> {
        cy.get('nav').getByText('About').click().url(`/about/`)
    })
})