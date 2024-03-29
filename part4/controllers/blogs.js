const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
   })
   response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
   const body = request.body
   const user = request.user

   const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
   })

   const savedBlog = await blog.save()
   user.blogs = user.blogs.concat(savedBlog._id)
   await user.save()

   response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
   const id = request.params.id

   const user = request.user

   const blog = await Blog.findById(id)

   if (blog.user.toString() !== user.id) {
      response.status(401).send({ error: 'Unauthorized deletion' })
   }

   await Blog.findByIdAndRemove(request.params.id)
   response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
   const body = request.body

   const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
   }

   const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
   })

   response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
