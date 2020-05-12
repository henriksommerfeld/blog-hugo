/// <reference types="Cypress" />

function visit(url, darkAppearance) {
  cy.visit(url, {
    onBeforeLoad (win) {
      cy.stub(win, 'matchMedia')
      .withArgs('(prefers-color-scheme: dark)')
      .returns({
        matches: darkAppearance,
      })
    },
  })
}

function visitDark(url) {
  visit(url, true);
}

function visitLight(url) {
  visit(url, false);
}

context('Theme', () => {
  describe('Using Dark OS Preference', ()=> {
    before(() => {
      window.localStorage.removeItem('theme');
      visitDark('/');
    })

    it('Should be dark', () => {
      cy.get('body').should('have.css', 'background-color', 'rgb(45, 55, 72)')
      cy.findByLabelText('Switch theme').should('not.be.checked')
    })

    it('Should turn light', () => {
      cy.findByLabelText('Switch theme').check()
      cy.get('body').should('have.css', 'background-color', 'rgb(250, 250, 250)')
      cy.findByLabelText('Switch theme').should('be.checked')
    })

    it('Should be light when previously set', () => {
      window.localStorage.setItem('theme', 'light')
      visitDark('/');
      
      cy.get('body').should('have.css', 'background-color', 'rgb(250, 250, 250)')
      cy.findByLabelText('Switch theme').should('be.checked')
    })
  
    it('Should turn dark', () => {
      cy.findByLabelText('Switch theme').uncheck()
      cy.get('body').should('have.css', 'background-color', 'rgb(45, 55, 72)')
      cy.findByLabelText('Switch theme').should('not.be.checked')
    })
  })

  describe('Using Light OS Preference', ()=> {
    before(() => {
      window.localStorage.removeItem('theme');
      visitLight('/');
    })

    it('Should be light', () => {
      cy.get('body').should('have.css', 'background-color', 'rgb(250, 250, 250)')
      cy.findByLabelText('Switch theme').should('be.checked')
    })

    it('Should turn dark', () => {
      cy.findByLabelText('Switch theme').uncheck()
      cy.get('body').should('have.css', 'background-color', 'rgb(45, 55, 72)')
      cy.findByLabelText('Switch theme').should('not.be.checked')
    })

    it('Should be dark when previously set', () => {
      window.localStorage.setItem('theme', 'dark')
      visitLight('/');
      
      cy.get('body').should('have.css', 'background-color', 'rgb(45, 55, 72)')
      cy.findByLabelText('Switch theme').should('not.be.checked')
    })
  
    it('Should turn light', () => {
      cy.findByLabelText('Switch theme').check()
      cy.get('body').should('have.css', 'background-color', 'rgb(250, 250, 250)')
      cy.findByLabelText('Switch theme').should('be.checked')
    })
  })
})