import React, { useEffect, useState } from 'react'

import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const LoginForm = ({ setToken, show, setPage }) => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const [login, result] = useMutation(LOGIN, {
      onError: (error) => {
         console.log(error.graphQLErrors[0].message)
      },
   })

   useEffect(() => {
      if (result.data) {
         const token = result.data.login.value
         setToken(token)
         setPage('authors')
         localStorage.setItem('library-user-token', token)
      }
   }, [result.data]) // eslint-disable-line

   if (!show) {
      return null
   }

   const submit = async (event) => {
      event.preventDefault()

      login({ variables: { username, password } })
   }

   return (
      <div>
         <form onSubmit={submit}>
            <div>
               username
               <input
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
               />
            </div>
            <div>
               password
               <input
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
               />
            </div>
            <button onClick={submit}>submit</button>
         </form>
      </div>
   )
}

export default LoginForm
