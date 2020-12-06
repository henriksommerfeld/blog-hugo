/// <reference types="Cypress" />

function visit(url, darkAppearance) {
  cy.visit(url, {
    onBeforeLoad(win) {
      cy.stub(win, 'matchMedia').withArgs('(prefers-color-scheme: dark)').returns({
        matches: darkAppearance,
      })
    },
  })
}

function visitDark(url) {
  visit(url, true)
}

function visitLight(url) {
  visit(url, false)
}

const darkColor = 'rgb(45, 55, 72)'
const lightColor = 'rgb(250, 250, 250)'

context('Theme', () => {
  describe('Using Dark OS Preference', () => {
    before(() => {
      window.localStorage.removeItem('theme')
      visitDark('/')
    })

    it('Should be dark', () => {
      cy.get('body').should('have.css', 'background-color', darkColor)
      cy.findByLabelText('Switch theme').should('not.be.checked')
    })

    it('Should turn light', () => {
      cy.findByLabelText('Switch theme').check()
      cy.get('body').should('have.css', 'background-color', lightColor)
      cy.findByLabelText('Switch theme').should('be.checked')
    })

    it('Should be light when previously set', () => {
      window.localStorage.setItem('theme', 'light')
      visitDark('/')

      cy.get('body').should('have.css', 'background-color', lightColor)
      cy.findByLabelText('Switch theme').should('be.checked')
    })

    it('Should turn dark', () => {
      cy.findByLabelText('Switch theme').uncheck()
      cy.get('body').should('have.css', 'background-color', darkColor)
      cy.findByLabelText('Switch theme').should('not.be.checked')
    })
  })

  describe('Using Light OS Preference', () => {
    before(() => {
      window.localStorage.removeItem('theme')
      visitLight('/')
    })

    it('Should be light', () => {
      cy.get('body').should('have.css', 'background-color', lightColor)
      cy.findByLabelText('Switch theme').should('be.checked')
    })

    it('Should turn dark', () => {
      cy.findByLabelText('Switch theme').uncheck()
      cy.get('body').should('have.css', 'background-color', darkColor)
      cy.findByLabelText('Switch theme').should('not.be.checked')
    })

    it('Should be dark when previously set', () => {
      window.localStorage.setItem('theme', 'dark')
      visitLight('/')

      cy.get('body').should('have.css', 'background-color', darkColor)
      cy.findByLabelText('Switch theme').should('not.be.checked')
    })

    it('Should turn light', () => {
      cy.findByLabelText('Switch theme').check()
      cy.get('body').should('have.css', 'background-color', lightColor)
      cy.findByLabelText('Switch theme').should('be.checked')
    })
  })
})
