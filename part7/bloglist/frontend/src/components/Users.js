import { Link } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

export const Users = () => {
   const users = useSelector(({ users }) => users)

   return (
      <div>
         <h2>Users</h2>
         <table>
            <tbody>
               <tr>
                  <th></th>
                  <th>blogs created</th>
               </tr>
               {users.map((user) => (
                  <tr key={user.id}>
                     <td>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                     </td>
                     <td>{user.blogs.length}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

export default Users
