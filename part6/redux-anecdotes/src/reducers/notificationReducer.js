const reducer = (state = '', action) => {
   switch (action.type) {
      case 'SHOW':
         return action.notification
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

export default reducer
