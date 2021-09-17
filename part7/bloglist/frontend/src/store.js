import { applyMiddleware, combineReducers, createStore } from 'redux'

import blogReducer from './reducers/blogReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
   blogs: blogReducer,
   notification: notificationReducer,
   user: userReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
