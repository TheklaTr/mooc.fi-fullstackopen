import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import storage from './utils/storage'

const App = () => {
   const blogs = useSelector((state) => state.blogs)

   const [user, setUser] = useState(null)
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const blogFormRef = React.createRef()

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(initializeBlogs())
   }, [dispatch])

   useEffect(() => {
      const user = storage.loadUser()
      setUser(user)
   }, [])

   const notifyWith = (message, type = 'success') => {
      dispatch(setNotification({ message, type }, 5))
   }

   const handleLogin = async (event) => {
      event.preventDefault()
      try {
         const user = await loginService.login({
            username,
            password,
         })

         setUsername('')
         setPassword('')
         setUser(user)
         notifyWith(`${user.name} welcome back!`)
         storage.saveUser(user)
      } catch (exception) {
         notifyWith('wrong username/password', 'error')
      }
   }

   const handleLogout = () => {
      setUser(null)
      storage.logoutUser()
   }

   if (!user) {
      return (
         <div>
            <h2>login to application</h2>

            <Notification />

            <form onSubmit={handleLogin}>
               <div>
                  username
                  <input
                     id="username"
                     value={username}
                     onChange={({ target }) => setUsername(target.value)}
                  />
               </div>
               <div>
                  password
                  <input
                     id="password"
                     type="password"
                     value={password}
                     onChange={({ target }) => setPassword(target.value)}
                  />
               </div>
               <button id="login">login</button>
            </form>
         </div>
      )
   }

   return (
      <div>
         <h2>blogs</h2>

         <Notification />

         <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
         </p>

         <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <NewBlog formRef={blogFormRef} />
         </Togglable>

         {blogs.map((blog) => (
            <Blog
               key={blog.id}
               blog={blog}
               own={user.username === blog.user.username}
            />
         ))}
      </div>
   )
}

export default App
