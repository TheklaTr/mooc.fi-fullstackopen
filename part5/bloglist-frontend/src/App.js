import './App.css'

import React, { useEffect, useState } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
   const [blogs, setBlogs] = useState([])
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const [notification, setNotification] = useState(null)

   const [user, setUser] = useState(null)

   const [title, setTitle] = useState('')
   const [author, setAuthor] = useState('')
   const [url, setUrl] = useState('')

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

   const addBlog = async (event) => {
      event.preventDefault()
      const blogObject = { title, author, url }

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification({
         message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
         style: 'success',
      })

      setTimeout(() => setNotification(null), 5000)
   }

   const loginForm = () => (
      <form onSubmit={handleLogin}>
         <div>
            username
            <input
               type="text"
               name="Username"
               value={username}
               onChange={({ target }) => setUsername(target.value)}
            />
         </div>
         <div>
            password
            <input
               type="password"
               name="Password"
               value={password}
               onChange={({ target }) => setPassword(target.value)}
            />
         </div>
         <button type="submit">login</button>
      </form>
   )

   const blogForm = () => (
      <form onSubmit={addBlog}>
         <div>
            title:
            <input
               type="text"
               name="Title"
               value={title}
               onChange={({ target }) => setTitle(target.value)}
            />
         </div>
         <div>
            author:
            <input
               type="text"
               name="Author"
               value={author}
               onChange={({ target }) => setAuthor(target.value)}
            />
         </div>
         <div>
            url:
            <input
               type="text"
               name="Url"
               value={url}
               onChange={({ target }) => setUrl(target.value)}
            />
         </div>
         <button type="submit">create</button>
      </form>
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
         <h2>create new</h2>
         {blogForm()}
         {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
         ))}
      </div>
   )
}

export default App
