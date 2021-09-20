import { Button, TableCell, TableRow } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, own }) => {
   const blogs = useSelector((state) => state.blogs)

   const dispatch = useDispatch()

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
      <TableRow className="blog">
         <TableCell>
            <Link to={`/blogs/${blog.id}`}>
               {blog.title} {blog.author}
            </Link>
         </TableCell>
         <TableCell align="right">
            {own && (
               <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemove(blog.id)}
               >
                  remove
               </Button>
            )}
         </TableCell>
      </TableRow>
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
