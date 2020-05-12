/// <reference types="Cypress" />

context('Theme', () => {
  before(() => {
    window.localStorage.setItem('theme', 'dark')
    cy.visit('/')
  })
  
  it('Should be dark', () => {
    cy.get('body').should('have.css', 'background-color', 'rgb(45, 55, 72)')
    cy.findByLabelText('Switch theme').should('not.be.checked')
  })

  it('Should be light', () => {
    cy.findByLabelText('Switch theme').check()
    cy.get('body').should('have.css', 'background-color', 'rgb(250, 250, 250)')
    cy.findByLabelText('Switch theme').should('be.checked')
  })

  it('Should be dark again', () => {
    cy.findByLabelText('Switch theme').uncheck()
    cy.get('body').should('have.css', 'background-color', 'rgb(45, 55, 72)')
    cy.findByLabelText('Switch theme').should('not.be.checked')
  })
})