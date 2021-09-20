import { Button, TextField } from '@material-ui/core'
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
            <TextField
               id="username"
               label="Username"
               variant="outlined"
               value={username}
               onChange={({ target }) => setUsername(target.value)}
               required
            />
         </div>
         <div>
            <TextField
               id="password"
               label="Password"
               variant="outlined"
               type="password"
               value={password}
               onChange={({ target }) => setPassword(target.value)}
               required
            />
         </div>
         <div>
            <Button variant="contained" color="primary" type="submit">
               login
            </Button>
         </div>
      </form>
   )
}

export default LoginForm
