import './App.css'

import React, { useEffect, useState } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
   const [blogs, setBlogs] = useState([])
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const [notification, setNotification] = useState(null)

   const [user, setUser] = useState(null)

   useEffect(() => {
      blogService.getAll().then((blogs) => setBlogs(blogs))
   }, [])

   useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON)
         setUser(user)
         blogService.setToken(user.token)
      }
   }, [])

   const handleLogin = async (event) => {
      event.preventDefault()

      try {
         const user = await loginService.login({ username, password })

         window.localStorage.setItem('loggedUser', JSON.stringify(user))
         blogService.setToken(user.token)

         setUser(user)
         setUsername('')
         setPassword('')
      } catch (exception) {
         setNotification({
            message: 'wrong username or password',
            style: 'error',
         })

         setTimeout(() => setNotification(null), 5000)
      }
   }

   const handleLogout = () => {
      setUser(null)
      setUsername('')
      setPassword('')
      setNotification({
         message: 'successfully logout',
         style: 'success',
      })
      setTimeout(() => setNotification(null), 5000)

      window.localStorage.clear()
   }

   const addBlog = async (blogObject) => {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setNotification({
         message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
         style: 'success',
      })

      setTimeout(() => setNotification(null), 5000)
   }

   const handleLike = async (blog) => {
      try {
         const likedBlog = await blogService.likeBlog(blog)
         setBlogs(blogs.map((b) => (b.id === likedBlog.id ? likedBlog : b)))
      } catch (error) {
         console.log(error)
      }
   }

   const DescendingSortBlog = blogs.sort((a, b) => b.likes - a.likes)

   const loginForm = () => (
      <LoginForm
         handleSubmit={handleLogin}
         username={username}
         handleUsernameChange={({ target }) => setUsername(target.value)}
         password={password}
         handlePasswordChange={({ target }) => setPassword(target.value)}
      />
   )

   const blogForm = () => (
      <Togglable buttonLabel="create new blog">
         <BlogForm createBlog={addBlog} />
      </Togglable>
   )

   if (user === null) {
      return (
         <div>
            <h2>log in to application</h2>
            <Notification notification={notification} />
            {loginForm()}
         </div>
      )
   }

   return (
      <div>
         <h2>blogs</h2>
         <Notification notification={notification} />
         <p>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
         </p>

         {blogForm()}
         {DescendingSortBlog.map((blog) => (
            <Blog key={blog.id} blog={blog} likeBlog={handleLike} />
         ))}
      </div>
   )
}

export default App
