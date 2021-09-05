import React, { useEffect, useState } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
   const [blogs, setBlogs] = useState([])
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

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
         console.log('Wrong credential')
      }
   }

   const handleLogout = () => {
      setUser(null)
      setUsername('')
      setPassword('')
      window.localStorage.clear()
   }

   const loginForm = () => (
      <form onClick={handleLogin}>
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

   if (user === null) {
      return (
         <div>
            <h2>log in to application</h2>
            {loginForm()}
         </div>
      )
   }

   return (
      <div>
         <h2>blogs</h2>
         <p>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
         </p>
         {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
         ))}
      </div>
   )
}

export default App
