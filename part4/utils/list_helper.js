const _ = require('lodash')

const dummy = (blogs) => {
   return 1
}

const totalLikes = (blogs) => {
   return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlogs = (blogs) => {
   if (!blogs || blogs.length === 0) return null

   const { title, author, likes } = blogs.reduce((prev, current) =>
      prev.likes > current.likes ? prev : current
   )
   return { title, author, likes }
}

const mostBlogs = (blogs) => {
   if (!blogs || blogs.length === 0) return null

   const result = _.chain(blogs)
      .groupBy('author') // returns the author
      .map((result) => {
         return { author: result[0].author, blogs: result.length } // largest amount of blogs
      })
      .maxBy('blogs')
      .value()

   return result
}

const mostLikes = (blogs) => {
   if (!blogs || blogs.length === 0) return null

   const result = _.chain(blogs)
      .groupBy('author') // returns the author
      .map((blogsPerAuthor) => {
         const likesPerAuthor = _.sumBy(blogsPerAuthor, (au) => au.likes) // total number of likes
         return { author: blogsPerAuthor[0].author, likes: likesPerAuthor }
      })
      .maxBy('likes') // largest amount of likes
      .value()

   return result
}

module.exports = { dummy, totalLikes, favoriteBlogs, mostBlogs, mostLikes }
