import {
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableRow,
   Typography,
} from '@material-ui/core'

import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users }) => {
   const id = useParams().id
   const user = users.find((u) => u.id === id)

   if (!user) {
      return null
   }

   return (
      <div>
         <Typography variant="h3">{user.name}</Typography>
         <Typography variant="h4">added blogs</Typography>
         <TableContainer component={Paper}>
            <Table>
               <TableBody>
                  {user.blogs.map((blog) => (
                     <TableRow key={blog.id}>
                        <TableCell>{blog.title}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   )
}

export default User
