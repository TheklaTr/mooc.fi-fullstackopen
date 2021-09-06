import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
   const blogStyle = {
      padding: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
   }
   console.log(blog)

   const [visible, setVisible] = useState(false)

   const toggleVisibility = () => {
      setVisible(!visible)
   }

   const handleLike = async () => {
      await likeBlog(blog)
   }

   return (
      <div style={blogStyle}>
         <div>
            {blog.title} {blog.author}{' '}
            <button onClick={toggleVisibility}>
               {visible ? 'hide' : 'show'}
            </button>
         </div>

         {visible && (
            <div>
               <div>{blog.url}</div>
               <div>
                  likes {blog.likes} <button onClick={handleLike}>like</button>
               </div>
               {!blog.user ? <div /> : <div>{blog.user.name}</div>}
            </div>
         )}
      </div>
   )
}

export default Blog