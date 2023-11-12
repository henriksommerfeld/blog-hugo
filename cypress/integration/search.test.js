/// <reference types="Cypress" />

context('Search', () => {
  before(() => {
    cy.visit('/')
  })

  beforeEach(() => {
    cy.viewport('macbook-15')
  })

  it('Should open searchbox', () => {
    cy.get('nav').findByText('Search').click().get('#search-input').should('be.visible')
  })

  const expectedPostTitle = 'Firmware Update Notifications for My Asus Router'
  it(`Should find post with title '${expectedPostTitle}' search for "asus firmware"`, () => {
    cy.get('#search-input')
      .wait(2000) // give some time for index file to download
      .type('asus firmware')
      .get('#search-output .result-list')
      .within(() => {
        cy.findByText(expectedPostTitle).should('be.visible')
      })
  })

  it(`Should set focus on first hit on enter`, () => {
    cy.get('#search-input').type('{enter}').get('#search-output .result-list li:first a').should('have.focus')
  })

  it(`Should set focus on first hit on down-arrow`, () => {
    cy.get('#search-input')
      .type('{downarrow}')
      .get('#search-output .result-list li:first a')
      .should('have.focus')
  })

  it(`Should navigate to post when clicked`, () => {
    cy.get('#search-output .result-list').within(() => {
      cy.findByText(expectedPostTitle)
        .click()
        .url()
        .should('equal', Cypress.config().baseUrl + `/firmware-update-notifications-for-my-asus-router/`)
    })
  })

  it('Should close on ESC key', () => {
    cy.get('nav')
      .findByText('Search')
      .click()
      .get('#search-input')
      .type('{esc}')
      .get('#search-input')
      .should('not.be.visible')
  })

  it('Should close on click outside', () => {
    cy.get('nav').findByText('Search').click().get('#search-input')
    cy.findByLabelText('Close search modal').click()
    cy.get('#search-input').should('not.be.visible')
  })

  it('Should close on searchbox close click', () => {
    cy.viewport('ipad-2')
    cy.get('#hamburger-trigger').click()
    cy.get('nav').findByText('Search').click().get('#search-input')
    cy.findByLabelText('Close search').click()
    cy.get('#search-input').should('not.be.visible')
  })
})
