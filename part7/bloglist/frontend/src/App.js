import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { initializeUser, removeUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import DetailedBlog from './components/DetailedBlog'
import LoginForm from './components/LoginForm'
import NavigationMenu from './components/NavigationMenu'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'
import Users from './components/Users'
import { initUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
   const blogs = useSelector((state) => state.blogs)
   const user = useSelector(({ user }) => user)
   const users = useSelector(({ users }) => users)

   const blogFormRef = React.createRef()

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(initializeBlogs())
      dispatch(initializeUser())
      dispatch(initUsers())
   }, [dispatch])

   const handleLogout = () => {
      dispatch(removeUser())
   }

   if (!user) {
      return (
         <div>
            <h2>login to application</h2>

            <Notification />
            <LoginForm />
         </div>
      )
   }

   return (
      <div>
         <NavigationMenu user={user} logout={handleLogout} />

         <h2>blog apps</h2>
         <Notification />

         <Switch>
            <Route path="/users/:id">
               <User users={users} />
            </Route>

            <Route path="/users">
               <Users />
            </Route>

            <Route path="/blogs/:id">
               <DetailedBlog blogs={blogs} />
            </Route>

            <Route path="/">
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
            </Route>
         </Switch>
      </div>
   )
}

export default App
