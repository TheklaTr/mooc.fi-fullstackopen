import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

import React from 'react'

const App = () => {
   const anecdotesToVote = useSelector((state) =>
      state.sort((a, b) => b.votes - a.votes)
   )
   const dispatch = useDispatch()

   const vote = (id) => {
      console.log('vote', id)
      dispatch(voteAnecdote(id))
   }

   const addAnecdote = (event) => {
      event.preventDefault()
      const newAnecdote = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(createAnecdote(newAnecdote))
   }

   return (
      <div>
         <h2>Anecdotes</h2>
         {anecdotesToVote.map((anecdote) => (
            <div key={anecdote.id}>
               <div>{anecdote.content}</div>
               <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id)}>vote</button>
               </div>
            </div>
         ))}
         <h2>create new</h2>
         <form onSubmit={addAnecdote}>
            <div>
               <input name="anecdote" />
            </div>
            <button type="submit">create</button>
         </form>
      </div>
   )
}

export default App
