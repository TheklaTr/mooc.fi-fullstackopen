import React, { useState } from 'react'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'

const Blog = ({ blog, own }) => {
   const [visible, setVisible] = useState(false)
   const blogs = useSelector((state) => state.blogs)

   const dispatch = useDispatch()

   const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
   }

   const label = visible ? 'hide' : 'view'

   const handleLike = async (id) => {
      const blogToLike = blogs.find((b) => b.id === id)
      dispatch(likeBlog(blogToLike))
   }

   const handleRemove = async (id) => {
      const blogToRemove = blogs.find((b) => b.id === id)
      const ok = window.confirm(
         `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
      if (ok) {
         dispatch(removeBlog(id))
      }
   }

   return (
      <div style={blogStyle} className="blog">
         <div>
            <i>{blog.title}</i> by {blog.author}{' '}
            <button onClick={() => setVisible(!visible)}>{label}</button>
         </div>
         {visible && (
            <div>
               <div>{blog.url}</div>
               <div>
                  likes {blog.likes}
                  <button onClick={() => handleLike(blog.id)}>like</button>
               </div>
               <div>{blog.user.name}</div>
               {own && (
                  <button onClick={() => handleRemove(blog.id)}>remove</button>
               )}
            </div>
         )}
      </div>
   )
}

Blog.propTypes = {
   blog: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
   }).isRequired,
   own: PropTypes.bool.isRequired,
}

export default Blog
