import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import React, { useState } from 'react'

import { useMutation } from '@apollo/client'

const AuthorForm = () => {
   const [name, setName] = useState('')
   const [born, setBorn] = useState('')

   const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
      refetchQueries: [{ query: ALL_AUTHORS }],
   })

   const submit = (event) => {
      event.preventDefault()

      changeBirthYear({ variables: { name, setBornTo: parseInt(born) } })

      setName('')
      setBorn('')
   }

   return (
      <div>
         <h2>Set birthyear</h2>
         <form onSubmit={submit}>
            <div>
               name
               <input
                  value={name}
                  onChange={({ target }) => setName(target.value)}
               />
            </div>
            <div>
               born
               <input
                  type="number"
                  value={born}
                  onChange={({ target }) => setBorn(target.value)}
               />
            </div>
            <button type="submit">update author</button>
         </form>
      </div>
   )
}

export default AuthorForm
