import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, own }) => {
   const blogs = useSelector((state) => state.blogs)

   const dispatch = useDispatch()

   const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
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
            <Link to={`/blogs/${blog.id}`}>
               {blog.title} {blog.author}
            </Link>{' '}
            {own && (
               <button onClick={() => handleRemove(blog.id)}>remove</button>
            )}
         </div>
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
