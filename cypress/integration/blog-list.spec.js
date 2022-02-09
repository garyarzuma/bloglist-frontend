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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('garyroolz')
      cy.get('#password').type('starpower')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('A Blog by Gary')
      cy.get('#author').type('Gary Arzumanyan')
      cy.get('#url').type('www.twitter.com/ablogbygary')
      cy.contains('create').click()
      cy.contains('A Blog by Gary by Gary Arzumanyan')
      cy.contains('View').click()
    })

    it('A blog can be liked', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('A Blog to be Liked')
      cy.get('#author').type('Gary Arzumanyan')
      cy.get('#url').type('www.twitter.com/ablogtoBeliked')
      cy.contains('create').click()
      cy.contains('View').click()
      cy.get('#likeButton').click()
      cy.contains('Likes: 1') //it defualts to likes being 0 since we didnt add any likes parameter
    })

    it('A blog can be deleted', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('A Blog to be Liked')
      cy.get('#author').type('Gary Arzumanyan')
      cy.get('#url').type('www.twitter.com/ablogtoBeliked')
      cy.contains('create').click()
      cy.contains('View').click()
      cy.get('#deleteButton').click()
      cy.get('html').should('not.contain', 'Likes')
    })

    it('Blogs are in order of descending Likes', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('A Blog to be Liked')
      cy.get('#author').type('Gary Arzumanyan')
      cy.get('#url').type('www.twitter.com/ablogtoBeliked')
      cy.contains('create').click()

      cy.get('#title').type('A Blog to be kinda Liked')
      cy.get('#author').type('Gary Arzumanyan')
      cy.get('#url').type('www.twitter.com/ablogtoBelikednotThatmuch')
      cy.contains('create').click()

      cy.get('#title').type('A Blog to be not liked')
      cy.get('#author').type('Gary Arzumanyan')
      cy.get('#url').type('www.twitter.com/ablogtoBelikednotatall')
      cy.contains('create').click().wait(500)

      cy.get('#blogArray #blog').eq(0).contains('View').click().wait(500)
      cy.get('#blogArray #blog').eq(0).contains('Like').click().wait(500)

      cy.get('#blogArray #blog').eq(1).contains('View').click().wait(500)
      cy.get('#blogArray #blog').eq(1).contains('Like').click().wait(500).click().wait(500)

      cy.get('#blogArray #blog').eq(2).contains('View').click().wait(500)
      cy.get('#blogArray #blog').eq(2).contains('Like').click().wait(500).click().wait(500).click().wait(500)
      cy.visit('http://localhost:3000')

      cy.get('#blogArray #blog').eq(0).contains('View').click().wait(500)
      cy.get('#blogArray #blog').eq(0).contains('Likes: 3')

      cy.get('#blogArray #blog').eq(1).contains('View').click().wait(500)
      cy.get('#blogArray #blog').eq(1).contains('Likes: 2')

      cy.get('#blogArray #blog').eq(2).contains('View').click().wait(500)
      cy.get('#blogArray #blog').eq(2).contains('Likes: 1')
    })

  })
})