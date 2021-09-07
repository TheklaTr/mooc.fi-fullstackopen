import PropTypes from 'prop-types'
import React from 'react'
import Togglable from './Togglable'

const LoginForm = ({
   username,
   password,
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
}) => (
   <form onSubmit={handleSubmit}>
      <div>
         username
         <input
            type="text"
            name="Username"
            value={username}
            onChange={handleUsernameChange}
         />
      </div>
      <div>
         password
         <input
            type="password"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
         />
      </div>
      <button type="submit">login</button>
   </form>
)

Togglable.propTypes = {
   username: PropTypes.string.isRequired,
   password: PropTypes.string.isRequired,
   handleSubmit: PropTypes.func.isRequired,
   handleUsernameChange: PropTypes.func.isRequired,
   handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
