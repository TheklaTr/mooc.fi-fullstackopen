import React, { useEffect, useState } from 'react'

import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
   const result = useQuery(ALL_BOOKS)
   const [filteredBooks, setFilteredBooks] = useState([])
   const [genre, setGenre] = useState('all genres')

   const genres = [
      'refactoring',
      'agile',
      'patterns',
      'design',
      'crime',
      'classic',
      'all genres',
   ]

   useEffect(() => {
      if (result.data) {
         setFilteredBooks([...result.data.allBooks])
         setGenre(genre)
      }
   }, [result.data]) // eslint-disable-line

   const selectGenre = (genre) => {
      if (genre === 'all genres') {
         setFilteredBooks([...result.data.allBooks])
         setGenre(genre)
         return
      }

      const books = result.data.allBooks.filter((b) => b.genres.includes(genre))
      setFilteredBooks(books)
      setGenre(genre)
   }

   if (result.loadings) {
      return <div>loading...</div>
   }

   if (!props.show) {
      return null
   }

   return (
      <div>
         <h2>books</h2>

         <table>
            <tbody>
               <tr>
                  <th></th>
                  <th>author</th>
                  <th>published</th>
                  {/* <th>genres</th> */}
               </tr>
               {filteredBooks.map((a) => (
                  <tr key={a.title}>
                     <td>{a.title}</td>
                     <td>{a.author.name}</td>
                     <td>{a.published}</td>
                     {/* <td>{a.genres.join(', ')}</td> */}
                  </tr>
               ))}
            </tbody>
         </table>
         {genres.map((genre, index) => (
            <button onClick={() => selectGenre(genre)}>{genre}</button>
         ))}
      </div>
   )
}

export default Books
