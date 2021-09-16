const reducer = (state = null, action) => {
   switch (action.type) {
   case 'SET_NOTIFICATION':
      return action.data
   case 'CLEAR_NOTIFICATION':
      return null
   default:
      return state
   }
}

let timeoutID

export const setNotification = (notification, time) => {
   return async (dispatch) => {
      dispatch({
         type: 'SET_NOTIFICATION',
         data: notification,
      })

      if (timeoutID) {
         clearTimeout(timeoutID)
      }

      timeoutID = setTimeout(() => {
         dispatch({
            type: 'CLEAR_NOTIFICATION',
         })
      }, time * 1000)
   }
}

export const clearNotification = () => {
   return async (dispatch) => {
      dispatch({
         type: 'CLEAR',
      })
   }
}

export default reducer
