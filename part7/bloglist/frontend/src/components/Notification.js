import { Alert } from '@material-ui/lab'
import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
   if (!notification) {
      return null
   }

   return <Alert severity={notification.type}>{notification.message}</Alert>
}

export default connect((state) => ({ notification: state.notification }))(
   Notification
)
