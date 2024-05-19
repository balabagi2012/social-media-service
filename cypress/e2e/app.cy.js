describe('Navigation', () => {
    it('should navigate to the auth page when first load', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Wait for auto redirect
        cy.wait(2000)

        // The new url should include "/auth"
        cy.url().should('include', '/auth')

        // The new page should contain an h4 with "User System"
        cy.get('h4').should("contain", 'User System')
    })

    it('should navigate to the auth page when no auth', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/auth/emailVerification')

        // Wait for auto redirect
        cy.wait(2000)

        // The new url should include "/auth"
        cy.url().should('include', '/auth')

        // The new page should contain an h4 with "User System"
        cy.get('h4').should("contain", 'User System')
    })
})

describe('Sign In with incorrect account and password', () => {
    it('should can show the error text', () => {
        cy.visit('http://localhost:3000/auth')

        // It should not show the error text when the page first load
        cy.get('p[id="error"]').should('not.exist')

        // Type the incorrect email and password
        cy.get('input[name="email"]').type(`testEmail@gmail.com`)
        cy.get('input[name="password"]').type('testPassword123')

        // Click the submit button
        cy.get('button[type="submit"]').click()

        // Wait for the error text to show
        cy.wait(2000)

        // The error text should exist
        cy.get('p[id="error"]').should('exist')
    })
})