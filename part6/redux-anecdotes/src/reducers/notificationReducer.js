const reducer = (state = '', action) => {
   switch (action.type) {
      case 'SHOW':
         return action.notification
      case 'HIDE':
         return null
      default:
         return state
   }
}

let timeoutID = undefined

export const showNotification = (notification, timeout) => {
   return (dispatch) => {
      if (timeoutID) {
         clearTimeout(timeoutID)
      }

      dispatch({
         type: 'SHOW',
         notification,
      })

      timeoutID = setTimeout(() => {
         dispatch(hideNotification())
      }, timeout * 1000)
   }
}

export const hideNotification = (notification) => {
   return {
      type: 'HIDE',
      notification,
   }
}

export default reducer
