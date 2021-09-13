import {
   hideNotification,
   showNotification,
} from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
   const dispatch = useDispatch()

   const vote = () => {
      dispatch(voteAnecdote(anecdote.id))
      dispatch(showNotification(`you voted '${anecdote.content}'`))
      setTimeout(() => dispatch(hideNotification()), 5000)
   }

   return (
      <div>
         <div>{anecdote.content}</div>
         <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
         </div>
      </div>
   )
}

const AnecdoteList = () => {
   const anecdotesToVote = useSelector(({ anecdotes }) =>
      anecdotes.sort((a, b) => b.votes - a.votes)
   )

   const filter = useSelector((state) => state.filter)
   const filteredAnecdote = anecdotesToVote.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
   )

   return (
      <div>
         {filteredAnecdote.map((anecdote) => (
            <Anecdote key={anecdote.id} anecdote={anecdote} />
         ))}
      </div>
   )
}

export default AnecdoteList
