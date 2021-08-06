const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
   await User.deleteMany({})

   const passwordHash = await bcrypt.hash('sekret', 5)
   const user = new User({
      username: 'tester',
      name: 'tester',
      passwordHash,
   })

   await user.save()
})

describe('Adding a new user', () => {
   test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
         username: 'test-1',
         name: 'test-1',
         password: 'test',
      }

      await api
         .post('/api/users')
         .send(newUser)
         .expect(200)
         .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map((u) => u.username)
      expect(usernames).toContain(newUser.username)
   })
})

afterAll(() => {
   mongoose.connection.close()
})
