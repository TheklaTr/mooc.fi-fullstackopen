import { ALL_BOOKS, BOOK_ADDED } from './queries'
import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

const App = () => {
   const [token, setToken] = useState(null)
   const [page, setPage] = useState('authors')

   const client = useApolloClient()

   const updateCacheWith = (addedBook) => {
      const includeIn = (set, object) =>
         set.map((p) => p.id).includes(object.id)

      const dataInStore = client.readQuery({ query: ALL_BOOKS })
      if (!includeIn(dataInStore.allBooks, addedBook)) {
         client.writeQuery({
            query: ALL_BOOKS,
            data: { allBooks: dataInStore.allBooks.concat(addedBook) },
         })
      }
   }

   useSubscription(BOOK_ADDED, {
      onSubscriptionData: ({ subscriptionData }) => {
         const addedBook = subscriptionData.data.bookAdded
         window.alert(`${addedBook.title} added`)
         updateCacheWith(addedBook)
      },
   })

   const logout = () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()
   }

   return (
      <div>
         <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            {token ? (
               <>
                  <button onClick={() => setPage('add')}>add book</button>
                  <button onClick={() => setPage('recommend')}>
                     recommend
                  </button>
                  <button onClick={logout}>logout</button>
               </>
            ) : (
               <button onClick={() => setPage('login')}>login</button>
            )}
         </div>

         <Authors show={page === 'authors'} />

         <Books show={page === 'books'} />

         <NewBook show={page === 'add'} />

         <LoginForm
            show={page === 'login'}
            setPage={setPage}
            setToken={setToken}
         />

         <Recommendations show={page === 'recommend'} />
      </div>
   )
}

export default App
