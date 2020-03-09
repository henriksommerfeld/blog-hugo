/// <reference types="Cypress" />

context('Post', () => {
  before(() => {
    cy.visit('/firmware-update-notifications-for-my-asus-router/')
  })

  const expectedPostTitle = 'Firmware Update Notifications for My Asus Router';

  it(`Post should have expected title`, () => {
    cy.get('article h1').should('have.text', expectedPostTitle);
  })

  it('Should have post title in window title', () => {
    cy.title().should('contain', expectedPostTitle);
  })

  it('Should have publishing date', () => {
    cy.get('article time.published')
      .should('have.text', '31 July 2018')
      .should('have.attr', 'datetime').and('include', '2018-07-31 11:14:58 +0200')
  })

  it('Should open image lighbox on click', () => {
    cy.findByAltText('Asus router web interface for uploading and applying a firmware update')
      .click({ force: true })
      .get('#lightbox').should('have.class', 'open')
  })

  it('Should close image lightbox on click', () => {
    cy.get('#lightbox img').click()
      .should('not.have.class', 'open')
  })

  it('Should open expanded code view', () => {
    cy.findByText('$TMPVERS').scrollIntoView()
      .findByTitle('Expand').click({ force: true })
      .get('#code-container').within(() => {
        cy.findByTitle('Close (Esc)').should('exist')
      })
  })

  it('Should close expanded code view', () => {
    cy.get('#code-container').within(() => {
      cy.findByTitle('Close (Esc)').click({ force: true })
    })
    cy.get('#code-container').should('not.have.class', 'open')
  })

  it('Should show tag Networking', () => {
    cy.get('article footer').within(() => {
      cy.findByText('Networking')
        .should('be.visible')
        .should('have.attr', 'href', '/tags/networking')
    })
  })

  it('Should show category Tooling', () => {
    cy.get('article footer').within(() => {
      cy.findByText('Tooling')
        .should('be.visible')
        .should('have.attr', 'href', '/categories/tooling')
    })
  })

  it('Should have comments button', () => {
    cy.findByText('Show Comments').should('be.visible')
  })

  it('Should load comments on button click', () => {
    cy.get("#disqus_thread").should('not.be.visible')
    cy.findByText('Show Comments').click({ force: true })
      .get("#disqus_thread").should('be.visible')
  })
})