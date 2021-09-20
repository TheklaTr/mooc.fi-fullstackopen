import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const NewBlog = ({ formRef }) => {
   const [title, setTitle] = useState('')
   const [author, setAuthor] = useState('')
   const [url, setUrl] = useState('')

   const dispatch = useDispatch()

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

         dispatch(
            setNotification(
               {
                  message: `a new blog '${title}' by ${author} added!`,
                  type: 'success',
               },
               5
            )
         )

         setTitle('')
         setAuthor('')
         setUrl('')
      } catch (exception) {
         dispatch(
            setNotification(
               {
                  message: exception.message,
                  style: 'error',
               },
               5
            )
         )
      }
   }

   return (
      <div>
         <h2>create new</h2>
         <form onSubmit={handleNewBlog}>
            <div>
               <TextField
                  id="title"
                  label="Title"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
               />
            </div>
            <div>
               <TextField
                  id="author"
                  label="Author"
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
               />
            </div>
            <div>
               <TextField
                  id="url"
                  label="Url"
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}
               />
            </div>
            <Button
               variant="contained"
               color="primary"
               type="submit"
               id="create"
            >
               create
            </Button>
         </form>
      </div>
   )
}

export default NewBlog
