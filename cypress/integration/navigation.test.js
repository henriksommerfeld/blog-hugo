/// <reference types="Cypress" />

context('Navigation', () => {
  describe('Desktop', () => {
    before(() => {
      cy.visit('/')
    })

    beforeEach(() => {
      cy.viewport('macbook-15')
    })

    it('Should open about page', () => {
      cy.get('nav')
        .findByText('About')
        .click()
        .url()
        .should('equal', Cypress.config().baseUrl + '/about/')
    })

    it('Should go back to start page', () => {
      cy.go('back')
        .url()
        .should('equal', Cypress.config().baseUrl + '/')
    })

    it('Should go to next page', () => {
      cy.get('.paging-controls')
        .findByText('Older')
        .click({ force: true })
        .url()
        .should('equal', Cypress.config().baseUrl + '/page/2/')
    })

    it('Should go to next page', () => {
      cy.get('.paging-controls')
        .findByText('Older')
        .click({ force: true })
        .url()
        .should('equal', Cypress.config().baseUrl + '/page/3/')
    })

    it('Should go to previous page', () => {
      cy.visit('/page/4')
      cy.get('.paging-controls')
        .findByText('Newer')
        .click({ force: true })
        .url()
        .should('equal', Cypress.config().baseUrl + '/page/3/')
    })

    it('Should go to first page', () => {
      cy.get('.paging-controls')
        .findByText('1')
        .click({ force: true })
        .url()
        .should('equal', Cypress.config().baseUrl + '/')
    })

    it('Should go to first tag', () => {
      cy.get('.tag-cloud-tags a:first')
        .click({ force: true })
        .url()
        .should('contain', Cypress.config().baseUrl + '/tags/')
      cy.findByText('Tag:').should('be.visible')
    })

    it('Should go to category Coding', () => {
      cy.get('.all-categories')
        .findByText('coding')
        .click({ force: true })
        .url()
        .should('equal', Cypress.config().baseUrl + '/categories/coding/')
      cy.findByText('Category:').should('be.visible')
    })

    it('Should go to last post in category', () => {
      cy.get('main article:last').findByText('Read →').click({ force: true })
      cy.get('footer .categories-tags')
        .findByText('Coding')
        .should('have.attr', 'href')
        .and('equal', '/categories/coding')
    })

    it('Should go to top of page', () => {
      cy.scrollTo('bottom')
        .get('#page-footer')
        .findByText('To top')
        .should('be.visible')
        .click({ force: true })
      cy.get('.site-title').should('be.visible').and('have.text', 'Henrik Sommerfeld')
    })

    it('Should go to start page', () => {
      cy.get('nav')
        .findByText('Home')
        .click({ force: true })
        .url()
        .should('equal', Cypress.config().baseUrl + '/')
    })

    it('404', () => {
      const baseUrl = Cypress.config().baseUrl
      const isLocal = baseUrl === 'http://localhost:1313'
      const invalidUrl = isLocal ? `${baseUrl}/404.html` : `${baseUrl}/iuneriuhweruh`
      cy.visit(invalidUrl, { failOnStatusCode: false })
        .get('h1')
        .findByText('Page Not Found (404)')
        .should('be.visible')
      cy.findByAltText('oops').should('be.visible')
    })
  })

  describe('Mobile', () => {
    before(() => {
      cy.visit('/')
    })

    beforeEach(() => {
      cy.viewport('samsung-s10')
    })

    it('Should open hamburger menu', () => {
      cy.get('nav').should('not.be.visible')
      cy.findByText('Menu').click()
      cy.get('nav').findByText('Home').should('be.visible')
    })

    it('Should open about page', () => {
      cy.findByText('Menu').click()
      cy.get('nav')
        .findByText('About')
        .click()
        .url()
        .should('equal', Cypress.config().baseUrl + '/about/')
    })
  })
})
