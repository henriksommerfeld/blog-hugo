/// <reference types="Cypress" />

context('Post', () => {
  before(() => {
    cy.visit('/firmware-update-notifications-for-my-asus-router/')
  })

  beforeEach(() => {
    cy.viewport('macbook-15');
  });

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

  it('Should open image lightbox on click', () => {
    cy.findByAltText('Asus router web interface for uploading and applying a firmware update')
      .click({ force: true })
      .get('#lightbox').should('have.class', 'open')
  })

  it('Should close image lightbox on click', () => {
    cy.get('#lightbox img').click()
      .should('not.have.class', 'open')
  })

  it('Should open expanded code view', () => {
    cy.findByText('#!/bin/sh').scrollIntoView();
    cy.findByTitle('Expand').click({force: true})
    cy.get('#code-container').within(() => {
      cy.findByText('"w1yy39m3ysguhyfyrpk54peve8ioc8 <- just fake"').should('be.visible')
    })
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