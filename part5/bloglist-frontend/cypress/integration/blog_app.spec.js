describe('Blog app', function () {
   beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
         name: 'test-a',
         username: 'test-a',
         password: 'test',
      }

      const user1 = {
         name: 'test-b',
         username: 'test-b',
         password: 'test',
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.request('POST', 'http://localhost:3003/api/users', user1)
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

         describe('and a blog exists', function () {
            beforeEach(function () {
               cy.createBlog({
                  title: 'title-testing',
                  author: 'author-testing',
                  url: 'url-testing.com',
               })
            })

            it('User can like a blog', function () {
               cy.contains('title-testing author-testing')
                  .parent()
                  .find('button')
                  .click()

               cy.get('.likeButton').click()
               cy.contains('likes 1')
            })

            it('User can delete their own blog', function () {
               cy.contains('title-testing author-testing')
                  .parent()
                  .find('button')
                  .click()

               cy.contains('remove').click()
               cy.get('html').should(
                  'not.contain',
                  'title-testing author-testing'
               )
            })

            it('User cannot delete other\'s blog', function () {
               cy.contains('logout').click()

               cy.login({ username: 'test-b', password: 'test' })

               cy.contains('title-testing author-testing')
                  .parent()
                  .find('button')
                  .click()

               cy.contains('remove').click()

               cy.get('html').should('contain', 'title-testing author-testing')

               cy.get('.error')
                  .should(
                     'contain',
                     'You do not have permission to remove this blog!'
                  )
                  .and('have.css', 'color', 'rgb(255, 0, 0)')
                  .and('have.css', 'border-style', 'solid')
            })

            it('Blogs are ordered descending according to likes', function () {
               cy.createBlog({
                  title: 'title-a',
                  author: 'author-a',
                  url: 'url-a.com',
               })

               cy.createBlog({
                  title: 'title-b',
                  author: 'author-b',
                  url: 'url-b.com',
               })

               cy.contains('title-a author-a').find('button').click()
               cy.contains('title-b author-b').find('button').click()
               cy.contains('title-testing author-testing')
                  .find('button')
                  .click()

               cy.get('.likeButton').then((button) => {
                  cy.wrap(button[1]).click()
                  cy.wrap(button[1]).click()
                  cy.wrap(button[2]).click()
                  cy.wrap(button[0]).click()
                  cy.wrap(button[1]).click()
                  cy.wrap(button[2]).click()
               })

               let likesArray = []
               let sortedLikes = []

               cy.get('.likeValue').then((likes) => {
                  likes.map((i, like) => {
                     likesArray.push(like.innerHTML)
                  })

                  sortedLikes = likesArray.sort((a, b) => {
                     return b - a
                  })

                  likes.map((i, like) => {
                     cy.wrap(like[i]).contains(sortedLikes[i])
                  })
               })
            })
         })
      })
   })
})
