import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
   const result = useQuery(ALL_BOOKS)
   const [getBooks, filteredBooks] = useLazyQuery(ALL_BOOKS)
   const [books, setBooks] = useState([])

   useEffect(() => {
      if (result.data && !filteredBooks.data) {
         setBooks(result.data.allBooks)
      } else if (filteredBooks.data) {
         setBooks(filteredBooks.data.allBooks)
      }
   }, [filteredBooks.data, result.data])

   if (filteredBooks.loadings) {
      return <div>loading...</div>
   }

   if (!props.show) {
      return null
   }

   const genres = result.data.allBooks
      .map((b) => b.genres)
      .flat()
      .filter((item, index, array) => array.indexOf(item) === index) // get all unique values
      .concat('all genres')

   // console.log(genres)

   const selectGenre = (genre) => {
      if (genre === 'all genres') {
         getBooks({ variables: { genre: null } })
      } else {
         getBooks({ variables: { genre } })
      }
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
               {books.map((a) => (
                  <tr key={a.title}>
                     <td>{a.title}</td>
                     <td>{a.author.name}</td>
                     <td>{a.published}</td>
                     {/* <td>{a.genres.join(', ')}</td> */}
                  </tr>
               ))}
            </tbody>
         </table>
         {genres.map((genre) => (
            <button key={genre} onClick={() => selectGenre(genre)}>
               {genre}
            </button>
         ))}
      </div>
   )
}

export default Books
