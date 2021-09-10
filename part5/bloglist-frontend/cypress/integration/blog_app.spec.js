describe('Blog app', function () {
   beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
         name: 'test-a',
         username: 'test-a',
         password: 'test',
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
   })

   it('Login form is shown', function () {
      cy.contains('log in to application')
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
   })

   describe('Login', function () {
      it('succeeds with correct credentials', function () {
         cy.get('#username').type('test-a')
         cy.get('#password').type('test')
         cy.get('#login-button').click()

         cy.contains('test-a logged in')
      })

      it('fails with wrong credentials', function () {
         cy.get('#username').type('test-a')
         cy.get('#password').type('wrong')
         cy.get('#login-button').click()

         cy.get('.error')
            .should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

         cy.get('html').should('not.contain', 'test-a logged in')
      })

      describe('When logged in', function () {
         beforeEach(function () {
            // log in user here
            cy.login({ username: 'test-a', password: 'test' })
         })

         it('A blog can be created', function () {
            cy.contains('create new blog').click()
            cy.get('#title').type('Title')
            cy.get('#author').type('Author')
            cy.get('#url').type('url.com')
            cy.get('#blog-button').click()

            cy.contains('Title Author')
         })
      })
   })
})
