import React, { useState } from 'react'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const NewBlog = ({ formRef }) => {
   const dispatch = useDispatch()
   const [title, setTitle] = useState('')
   const [author, setAuthor] = useState('')
   const [url, setUrl] = useState('')

   const handleNewBlog = (event) => {
      event.preventDefault()

      try {
         dispatch(
            createBlog({
               title,
               author,
               url,
            })
         )

         formRef.current.toggleVisibility()

         setNotification(
            dispatch({
               message: `a new blog '${title}' by ${author} added!`,
               style: 'success',
            })
         )

         setTitle('')
         setAuthor('')
         setUrl('')
      } catch (exception) {
         console.log(exception)
      }
   }

   return (
      <div>
         <h2>create new</h2>
         <form onSubmit={handleNewBlog}>
            <div>
               author
               <input
                  id="author"
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
               />
            </div>
            <div>
               title
               <input
                  id="title"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
               />
            </div>
            <div>
               url
               <input
                  id="url"
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}
               />
            </div>
            <button id="create">create</button>
         </form>
      </div>
   )
}

export default NewBlog
