import { Link } from 'react-router-dom'
import React from 'react'

const NavigationMenu = ({ user, logout }) => {
   const padding = { padding: 5 }
   return (
      <div>
         <Link style={padding} to="/">
            blogs
         </Link>
         <Link style={padding} to="/users">
            users
         </Link>
         {user && (
            <>
               {user.name} logged in
               <button onClick={logout}>logout</button>
            </>
         )}
      </div>
   )
}

export default NavigationMenu
