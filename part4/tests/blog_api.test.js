const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''

beforeEach(async () => {
   await Blog.deleteMany({})

   for (const blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
   }
})

beforeAll(async (done) => {
   await User.deleteMany({})

   const passwordHash = await bcrypt.hash('testing', 10)
   const user = new User({ username: 'root', passwordHash })

   await user.save()

   await api
      .post('/api/login')
      .send({ username: 'root', password: 'testing' })
      .end((err, res) => {
         token = res.body.token
         done()
      })
})

test('the amount of blogs returned is correct', async () => {
   const blogsAtStart = await helper.blogsInDb()

   const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

   expect(response.body).toHaveLength(blogsAtStart.length)
})

test('the unique identifier property of the blog posts', async () => {
   const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)

   expect(response.body[0].id).toBeDefined()
})

test('successfully creates a new blog post ', async () => {
   const newBlog = {
      title: 'test add blog',
      author: 'Author Test 1',
      url: 'https://testblog1.com',
      likes: 3,
   }

   await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

   const blogsAtEnd = await helper.blogsInDb()

   // verify that the total number of blogs in the system is increased by one
   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

   // verify that the content of the blog post is saved correctly to the database
   const titles = blogsAtEnd.map((blog) => blog.title)
   expect(titles).toContain('test add blog')
})

test('fails with status 401 if unauthorized', async () => {
   const newBlog = {
      title: 'test add blog',
      author: 'Author Test 2',
      likes: 5,
   }

   await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
})

test("the 'likes' property will default to 0 when missing form the request", async () => {
   const newBlog = {
      title: 'test add blog without likes',
      author: 'Author Test 2',
      url: 'https://testblog2.com',
   }

   const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)

   expect(savedBlog.body.likes).toBe(0)
})

test('a blog without title and url', async () => {
   const newBlog = {
      author: 'Author Test 3',
   }

   await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

   const blogsAtEnd = await helper.blogsInDb()

   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('succeeds with status code 204 if id is valid', async () => {
   const blogsAtStart = await helper.blogsInDb()
   const blogToDelete = blogsAtStart[0]

   await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

   const blogsAtEnd = await helper.blogsInDb()
   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

   const titles = blogsAtEnd.map((blog) => blog.title)

   expect(titles).not.toContain(blogToDelete.title)
})

test('succeed updating a blog with valid id and info', async () => {
   const blogsAtStart = await helper.blogsInDb()
   const blogToUpdate = blogsAtStart[0]

   const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 12,
   }

   await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

   const blogsAtEnd = await helper.blogsInDb()
   expect(blogsAtEnd[0].likes).toEqual(12)
})

afterAll(() => {
   mongoose.connection.close()
})
