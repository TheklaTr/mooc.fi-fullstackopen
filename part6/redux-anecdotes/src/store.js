import { combineReducers, createStore } from 'redux'

import anecdoteReducer from './reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
   anecdotes: anecdoteReducer,
   notification: notificationReducer,
   filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools())

export default store
