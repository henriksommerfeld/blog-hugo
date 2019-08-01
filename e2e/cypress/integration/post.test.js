/// <reference types="Cypress" />

context('Post', () => {
    before(() => {
      cy.visit('/firmware-update-notifications-for-my-asus-router/')
    })   

    const expectedPostTitle = 'Firmware Update Notifications for My Asus Router';
    
    it(`Post should have expected title`, ()=> {
      cy.get('article h1').should('have.text', expectedPostTitle);
    })

    it('Should have post title in window title', ()=> {
      cy.title().should('contain', expectedPostTitle);
    })

    it('Should have publishing date', ()=> {
        cy.get('article time.published')
          .should('have.text', '31, July 2018')
          .should('have.attr', 'datetime').and('include', '2018-07-31 11:14:58 +0200')
    })

    it('Should open image lighbox on click', ()=> {
      cy.getByAltText('Asus router web interface for uploading and applying a firmware update')
        .click()
        .get('#lightbox').should('have.class', 'open')
    })

    it('Should close image lightbox on click', ()=> {
      cy.get('#lightbox img').click()
        .should('not.have.class', 'open')
    })

    it('Should open expanded code view', ()=> {
      cy.getByText('$TMPVERS').scrollIntoView()
        .getByTitle('Expand').click()
        .get('#code-container').within(() => {
          cy.getByTitle('Close (Esc)').should('exist')
        })
    })

    it('Should close expanded code view', ()=> {
      cy.get('#code-container').within(() => {
        cy.getByTitle('Close (Esc)').click()        
      })
      cy.get('#code-container').should('not.have.class', 'open')
    })

    it('Should show tag Networking', ()=> {
      cy.get('article footer').within(() => {
        cy.getByText('Networking')
          .should('be.visible')
          .should('have.attr', 'href', '/tags/networking')
      })
    })

    it('Should show category Tooling', ()=> {
      cy.get('article footer').within(() => {
        cy.getByText('Tooling')
          .should('be.visible')
          .should('have.attr', 'href', '/categories/tooling')
      })
    })

    it('Should have comments button', ()=> {
      cy.getByText('Show Comments').should('be.visible')
    })

    it('Should load comments on button click', ()=> {
      cy.getByText('Show Comments').click()
        .get("#disqus_thread iframe").should('be.visible')
    })
})