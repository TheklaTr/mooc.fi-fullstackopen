import React, { useState } from 'react'

import PropTypes from 'prop-types'

const Togglable = (props) => {
   const [visible, setVisible] = useState(false)
   const show = { display: visible ? '' : 'none' }
   const hide = { display: visible ? 'none' : '' }

   const toggleVisibility = () => {
      setVisible(!visible)
   }

   return (
      <div>
         <div style={hide}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
         </div>

         <div style={show}>
            {props.children}
            <button onClick={toggleVisibility}>cancel</button>
         </div>
      </div>
   )
}

Togglable.propTypes = {
   buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
