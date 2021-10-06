import { ALL_BOOKS, GET_USER } from '../queries'
import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'

const Recommendations = ({ show }) => {
   const result = useQuery(GET_USER)
   const [getBooks, userBooks] = useLazyQuery(ALL_BOOKS)
   const [books, setBooks] = useState([])

   useEffect(() => {
      if (result.data) {
         // get books based on user's genre
         getBooks({ variables: { genre: result.data.me.favoriteGenre } }) // => userBooks
         // set book state from books based on user's favorite genre
         setBooks(userBooks.data?.allBooks) // => books
      }
   }, [result.data, getBooks, userBooks.data])

   if (!show) {
      return null
   }

   if (userBooks.loading) {
      return <div>loading...</div>
   }

   return (
      <div>
         <h2>recommendations</h2>
         <p>
            books in your favorite genre <b>{result.data.me.favoriteGenre}</b>
         </p>
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
      </div>
   )
}

export default Recommendations
