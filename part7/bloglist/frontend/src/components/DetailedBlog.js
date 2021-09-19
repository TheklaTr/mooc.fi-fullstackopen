import { addComment, likeBlog } from '../reducers/blogReducer'

import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const DetailedBlog = ({ blogs }) => {
   const id = useParams().id
   const blog = blogs.find((b) => b.id === id)

   const dispatch = useDispatch()

   const handleLike = async (id) => {
      const blogToLike = blogs.find((b) => b.id === id)
      dispatch(likeBlog(blogToLike))
   }

   const handleSubmit = (event) => {
      const comment = event.target.comment.value

      dispatch(addComment(id, comment))
      event.target.reset()
   }

   if (!blog) {
      return null
   }

   return (
      <div>
         <h1>{blog.title}</h1>
         <a href={blog.url}>{blog.url}</a>
         <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
         </div>
         <div>added by {blog.user.name}</div>

         <h2>comments</h2>
         <form onSubmit={handleSubmit}>
            <input name="comment" type="text" />
            <button type="submit">add comment</button>
         </form>
         <ul>
            {blog.comments.map((comment, index) => (
               <li key={index}>{comment}</li>
            ))}
         </ul>
      </div>
   )
}

export default DetailedBlog
