import { useDispatch, useSelector } from 'react-redux'

import React from 'react'
import { showNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
   const dispatch = useDispatch()

   const vote = () => {
      dispatch(voteAnecdote(anecdote))
      dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
   }

   return (
      <div>
         <div>{anecdote.content}</div>
         <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
         </div>
      </div>
   )
}

const AnecdoteList = () => {
   const filteredAnecdote = useSelector(({ anecdotes, filter }) => {
      // filter
      const shownAnecDote = anecdotes.filter((anecdote) =>
         anecdote.content.toLowerCase().includes(filter)
      )

      return shownAnecDote.sort((a, b) => b.votes - a.votes) // sort based on vote
   })

   return (
      <div>
         {filteredAnecdote.map((anecdote) => (
            <Anecdote key={anecdote.id} anecdote={anecdote} />
         ))}
      </div>
   )
}

export default AnecdoteList
