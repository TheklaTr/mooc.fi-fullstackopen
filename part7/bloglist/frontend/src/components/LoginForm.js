import React, { useState } from 'react'

import loginService from '../services/login'
import { saveUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const dispatch = useDispatch()

   const handleLogin = async (event) => {
      event.preventDefault()
      try {
         const user = await loginService.login({
            username,
            password,
         })

         setUsername('')
         setPassword('')
         dispatch(saveUser(user))

         dispatch(
            setNotification(
               {
                  message: `${user.name} welcome back!`,
                  type: 'success',
               },
               5
            )
         )
      } catch (exception) {
         dispatch(
            setNotification(
               {
                  message: 'wrong username/password',
                  type: 'error',
               },
               5
            )
         )
      }
   }

   return (
      <form onSubmit={handleLogin}>
         <div>
            username
            <input
               id="username"
               value={username}
               onChange={({ target }) => setUsername(target.value)}
            />
         </div>
         <div>
            password
            <input
               id="password"
               type="password"
               value={password}
               onChange={({ target }) => setPassword(target.value)}
            />
         </div>
         <button id="login">login</button>
      </form>
   )
}

export default LoginForm
