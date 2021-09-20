import {
   Paper,
   Table,
   TableBody,
   TableContainer,
   Typography,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { initializeUser, removeUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Container from '@material-ui/core/Container'
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
         <Container>
            <Typography variant="h2">login to application</Typography>

            <Notification />
            <LoginForm />
         </Container>
      )
   }

   return (
      <Container>
         <NavigationMenu user={user} logout={handleLogout} />

         <Typography variant="h3">blog apps</Typography>
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

               <TableContainer component={Paper}>
                  <Table>
                     <TableBody>
                        {blogs.map((blog) => (
                           <Blog
                              key={blog.id}
                              blog={blog}
                              own={user.username === blog.user.username}
                           />
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Route>
         </Switch>
      </Container>
   )
}

export default App
