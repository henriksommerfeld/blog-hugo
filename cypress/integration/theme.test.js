/// <reference types="Cypress" />

context('Theme', () => {
  before(() => {
    window.localStorage.removeItem('theme')
    cy.visit('/')
  })

  it('Should be dark', () => {
    // Dark set for chromium browsers (like Electron run in CI). See cypress/plugins/inde.js
    cy.get('body').should('have.css', 'background-color', 'rgb(45, 55, 72)')
    cy.findByLabelText('Switch theme').should('not.be.checked')
  })
  
  it('Should be light', () => {
    window.localStorage.setItem('theme', 'light')
    cy.visit('/')
    
    cy.get('body').should('have.css', 'background-color', 'rgb(250, 250, 250)')
    cy.findByLabelText('Switch theme').should('be.checked')
  })

  it('Should be dark', () => {
    cy.findByLabelText('Switch theme').uncheck()
    cy.get('body').should('have.css', 'background-color', 'rgb(45, 55, 72)')
    cy.findByLabelText('Switch theme').should('not.be.checked')
  })

  it('Should be light again', () => {
    cy.findByLabelText('Switch theme').check()
    cy.get('body').should('have.css', 'background-color', 'rgb(250, 250, 250)')
    cy.findByLabelText('Switch theme').should('be.checked')
  })
})