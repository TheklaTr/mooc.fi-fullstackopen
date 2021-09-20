import {
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
} from '@material-ui/core'

import { Link } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

export const Users = () => {
   const users = useSelector(({ users }) => users)

   return (
      <div>
         <h2>Users</h2>
         <TableContainer component={Paper}>
            <Table>
               <TableHead sx={{ color: 'success.main' }}>
                  <TableRow>
                     <TableCell></TableCell>
                     <TableCell>blogs created</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>
                  {users.map((user) => (
                     <TableRow key={user.id}>
                        <TableCell>
                           <Link to={`/users/${user.id}`}>{user.name}</Link>
                        </TableCell>
                        <TableCell>{user.blogs.length}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   )
}

export default Users
