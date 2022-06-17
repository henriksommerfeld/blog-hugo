/// <reference types="Cypress" />

context('Animated gif', () => {
  before(() => {
    cy.visit('/find-github-repositories-locally/')
  })

  beforeEach(() => {
    cy.viewport('macbook-15')
  })

  it('Should have the animated gif visible', () => {
    cy.findByAltText('Search repos locally').should('be.visible')
  })
})
