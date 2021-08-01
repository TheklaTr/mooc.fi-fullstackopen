const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
   await Blog.deleteMany({})

   for (const blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
   }
})

test('the amount of blogs returned is correct', async () => {
   const blogsAtStart = await helper.blogsInDb()

   const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

   expect(response.body).toHaveLength(blogsAtStart.length)
})

test('the unique identifier property of the blog posts', async () => {
   const response = await api.get('/api/blogs')
   expect(response.body[0].id).toBeDefined()
})

test('successfully creates a new blog post ', async () => {
   const newBlog = {
      title: 'test add blog',
      author: 'Author Test 1',
      url: 'https://testblog1.com',
      likes: 0,
   }

   const response = await api
      .post('/api/blogs')
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

afterAll(() => {
   mongoose.connection.close()
})
