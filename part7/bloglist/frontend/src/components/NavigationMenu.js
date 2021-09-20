import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core'

import { Link } from 'react-router-dom'
import React from 'react'

const NavigationMenu = ({ user, logout }) => {
   return (
      <AppBar position="static">
         <Toolbar>
            <Button sx={{ mr: 2 }} color="inherit" component={Link} to="/">
               blogs
            </Button>
            <Button sx={{ mr: 1 }} color="inherit" component={Link} to="/users">
               users
            </Button>

            {user && (
               <>
                  <Typography component="div">{user.name} logged in</Typography>

                  <Box ml={105}>
                     <Button
                        color="inherit"
                        variant="outlined"
                        onClick={logout}
                     >
                        logout
                     </Button>
                  </Box>
               </>
            )}
         </Toolbar>
      </AppBar>
   )
}

export default NavigationMenu
