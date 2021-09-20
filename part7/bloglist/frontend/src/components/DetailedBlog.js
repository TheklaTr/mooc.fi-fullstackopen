import {
   Button,
   Card,
   CardContent,
   IconButton,
   Link,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableRow,
   TextField,
   Typography,
} from '@material-ui/core'
import { addComment, likeBlog } from '../reducers/blogReducer'

import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
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
         <Card>
            <CardContent>
               <Typography variant="h4" component="div">
                  {blog.title}
               </Typography>
               <Typography variant="h6">added by {blog.user.name}</Typography>
               <Link variant="h6" underline="hover" href={blog.url}>
                  {blog.url}
               </Link>
               <Typography variant="h6">
                  likes {blog.likes}
                  <IconButton
                     color="primary"
                     aria-label="like blog"
                     onClick={() => handleLike(blog.id)}
                  >
                     <ThumbUpIcon />
                  </IconButton>
               </Typography>
            </CardContent>
         </Card>
         <Typography variant="h4">comments</Typography>
         <form onSubmit={handleSubmit}>
            <TextField name="comment" type="text" />
            <Button variant="outlined" type="submit">
               add comment
            </Button>
         </form>

         <TableContainer component={Paper}>
            <Table>
               <TableBody>
                  {blog.comments.map((comment, index) => (
                     <TableRow key={index}>
                        <TableCell>{comment}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   )
}

export default DetailedBlog
