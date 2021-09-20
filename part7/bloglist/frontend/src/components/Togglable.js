import React, { useImperativeHandle, useState } from 'react'

import { Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
   const [visible, setVisible] = useState(false)

   const hideWhenVisible = { display: visible ? 'none' : '' }
   const showWhenVisible = { display: visible ? '' : 'none' }

   const toggleVisibility = () => {
      setVisible(!visible)
   }

   useImperativeHandle(ref, () => {
      return {
         toggleVisibility,
      }
   })

   return (
      <div>
         <Button
            style={hideWhenVisible}
            variant="contained"
            color="primary"
            onClick={toggleVisibility}
         >
            {props.buttonLabel}
         </Button>

         <div style={showWhenVisible} className="togglableContent">
            {props.children}
            <Button
               variant="outlined"
               color="primary"
               onClick={toggleVisibility}
            >
               cancel
            </Button>
         </div>
      </div>
   )
})

Togglable.displayName = 'Togglable'

export default Togglable
