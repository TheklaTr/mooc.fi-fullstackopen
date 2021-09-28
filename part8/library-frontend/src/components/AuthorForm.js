import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import React, { useState } from 'react'

import Select from 'react-select'
import { useMutation } from '@apollo/client'

const AuthorForm = (props) => {
   const [selectedAuthor, setSelectedAuthor] = useState('')
   const [born, setBorn] = useState('')

   const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
      refetchQueries: [{ query: ALL_AUTHORS }],
   })

   const options = props.authors.map((a) => {
      return {
         value: a.name,
         label: a.name,
      }
   })

   const submit = (event) => {
      event.preventDefault()

      changeBirthYear({
         variables: {
            name: selectedAuthor.value,
            setBornTo: parseInt(born),
         },
      })

      setBorn('')
   }

   return (
      <div>
         <h2>Set birthyear</h2>
         <form onSubmit={submit}>
            <Select
               defaultValue={selectedAuthor}
               onChange={setSelectedAuthor}
               options={options}
            />

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
