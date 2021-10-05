import { ALL_BOOKS, GET_USER } from '../queries'
import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'

const Recommendations = ({ show }) => {
   const result = useQuery(GET_USER)
   const allBooks = useQuery(ALL_BOOKS)
   const [books, setBooks] = useState([])

   useEffect(() => {
      if (result.data) {
         setBooks([
            ...books.filter((b) =>
               b.genres.includes(result.data?.me?.favoriteGenre)
            ),
         ])
      }
   }, [result.data]) // eslint-disable-line

   useEffect(() => {
      if (allBooks.data) {
         setBooks(allBooks.data.allBooks)
      }
   }, [setBooks]) // eslint-disable-line

   if (!show) {
      return null
   }

   if (allBooks.loading) {
      return <div>loading...</div>
   }

   console.log(result.data)

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
