describe('Navigation', () => {
    it('should navigate to the auth page when first load', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Wait for auto redirect
        cy.wait(2000)

        // The new url should include "/about"
        cy.url().should('include', '/auth')

        // The new page should contain an h4 with "User System"
        cy.get('h4').should("contain", 'User System')
    })


})