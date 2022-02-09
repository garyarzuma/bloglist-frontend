describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const goodUser = {
      name: 'garybob',
      username: 'garyroolz',
      password: 'starpower'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', goodUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('form').contains('username')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('garyroolz')
      cy.get('#password').type('starpower')
      cy.get('#login-button').click()
      cy.contains('garybob logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('xxxxx')
      cy.get('#password').type('xxxxx')
      cy.get('#login-button').click()
      cy.contains('Wrong')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})