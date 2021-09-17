import storage from '../utils/storage'

const reducer = (state = null, action) => {
   switch (action.type) {
   case 'INIT_USER':
      return action.data
   case 'SET_USER':
      return action.data
   case 'REMOVE_USER':
      return null
   default:
      return state
   }
}

export const initializeUser = () => {
   return (dispatch) => {
      const data = storage.loadUser()
      dispatch({
         type: 'INIT_USER',
         data,
      })
   }
}

export const saveUser = (data) => {
   return (dispatch) => {
      storage.saveUser(data)
      dispatch({
         type: 'SET_USER',
         data,
      })
   }
}

export const removeUser = () => {
   return (dispatch) => {
      storage.logoutUser()
      dispatch({
         type: 'REMOVE_USER',
      })
   }
}

export default reducer
