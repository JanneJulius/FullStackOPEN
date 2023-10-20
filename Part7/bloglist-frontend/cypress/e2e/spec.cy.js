describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Teemu Testaaja',
      username: 'Testaaja',
      password: 'salasana',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('Login tests', function () {
    it('Login form is shown', function () {
      cy.contains('login')
      cy.contains('Login')
      cy.contains('username')
      cy.contains('password')
    })

    it('user can login with right credentials', function () {
      cy.get('#username').type('Testaaja')
      cy.get('#password').type('salasana')
      cy.get('#loginButton').click()

      cy.contains('Teemu Testaaja logged in')
    })

    it('login fails with wrong credentials', function () {
      cy.get('#username').type('abcd')
      cy.get('#password').type('1234')
      cy.get('#loginButton').click()

      cy.get('#notification')
        .should('contain', 'Wrong credentials!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Teemu Testaaja logged in')

    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('Testaaja')
      cy.get('#password').type('salasana')
      cy.get('#loginButton').click()
    })

    it('user can logout', function () {
      cy.contains('Logout').click()

      // Check that initial view is visible
      cy.contains('login')
      cy.contains('Login')
      cy.contains('username')
      cy.contains('password')
    })

    it('a new blog can be created', function () {
      cy.contains('Create a Blog').click()
      cy.get('#title').type('cypress blog')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('http://cypress.com')
      cy.contains('create').click()
      cy.contains('cypress blog by cypress author')
    })

    it('creating a blog requires all details', function () {
      // url is missing
      cy.contains('Create a Blog').click()
      cy.get('#title').type('cypress blog')
      cy.get('#author').type('cypress author')
      cy.contains('create').click()
      cy.get('#notification')
        .should('contain', 'Error when creating a new blog')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in and one blog creted', function () {
    beforeEach(function () {
      cy.get('#username').type('Testaaja')
      cy.get('#password').type('salasana')
      cy.get('#loginButton').click()
      cy.contains('Create a Blog').click()
      cy.get('#title').type('cypress blog')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('http://cypress.com')
      cy.contains('create').click()
    })

    it('user can see more details by clicking "view"', function () {
      cy.contains('view').click()
      cy.contains('cypress blog by cypress author')
      cy.contains('http://cypress.com')
      cy.contains('Teemu Testaaja')
    })

    it('user can add likes', function () {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains(3)
    })

    it('user can delete a blog which is created by him', function () {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('cybress blog by cypress author').should('not.exist')
      cy.get('#notification')
        .should('contain', 'Deleted blog cypress blog')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('user cant delete blog which is not created by him', function () {
      cy.contains('Logout').click()
      const user2 = {
        name: 'Teemu Tester',
        username: 'Tester',
        password: 'password',
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.get('#username').type('Tester')
      cy.get('#password').type('password')
      cy.get('#loginButton').click()
      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('#notification')
        .should('contain', 'Error when deleting a blog')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

  describe('Test that', function () {

    it('sort is done according to likes', function () {
      cy.get('#username').type('Testaaja')
      cy.get('#password').type('salasana')
      cy.get('#loginButton').click()
      // Blog1
      cy.contains('Create a Blog').click()
      cy.get('#title').type('blog1')
      cy.get('#author').type('author1')
      cy.get('#url').type('url1')
      cy.contains('create').click()
      // Blog2
      cy.contains('Create a Blog').click()
      cy.get('#title').type('blog2')
      cy.get('#author').type('author2')
      cy.get('#url').type('url2')
      cy.contains('create').click()

      // Initial order
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('blog1')
        cy.wrap(blogs[1]).contains('blog2')
      })

      cy.contains('blog2 by author2').contains('view').click()

      // Like blog 2 twice
      cy.contains('like').click()
      cy.contains('like').click()

      // Now blog 2 is first on the list
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('blog2')
        cy.wrap(blogs[1]).contains('blog1')
      })

    })
  })

})