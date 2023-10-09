import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { Grid, Link, ListSubheader, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <div><Box sx={{ flexGrow: 1 }}>
    {/* <FormGroup> */}
    {/* <FormControlLabel
      control={
        <Switch
          checked={auth}
          onChange={handleChange}
          aria-label="login switch"
        />
      }
      label={auth ? 'Logout' : 'Login'}
    /> */}
    {/* </FormGroup> */}
    <AppBar position="static" className='app-bar'>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Photos
        </Typography>
        <Button variant="contained" color="secondary">Create</Button>

        {/* {auth && (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
      )} */}
      </Toolbar>
    </AppBar>
  </Box></div>
  )
}
