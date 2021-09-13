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

export const showNotification = (notification) => {
   return {
      type: 'SHOW',
      notification,
   }
}

export const hideNotification = (notification) => {
   return {
      type: 'HIDE',
      notification,
   }
}

export default reducer
