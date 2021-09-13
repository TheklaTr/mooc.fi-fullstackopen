import { useDispatch, useSelector } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import React from 'react'
import { voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
   const anecdotesToVote = useSelector((state) =>
      state.sort((a, b) => b.votes - a.votes)
   )
   const dispatch = useDispatch()

   const vote = (id) => {
      console.log('vote', id)
      dispatch(voteAnecdote(id))
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
         <AnecdoteForm />
      </div>
   )
}

export default App
