import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import './App.css'

function Header() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('jwt');

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  }

  const handleCreate = () => {
    navigate('/post/create');
  }

  const handleBack = () => {
    navigate('/post/list');
  }

  return (
    <div>
      {currentRoute !== '/auth/login' && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: 'grey'}}>
            <Toolbar>
              {currentRoute === '/post/list' && (
                <><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Post List
                </Typography><Button style={{ marginRight: '30px' }} variant="contained" color="secondary" onClick={handleCreate}>Create</Button></>
              )}
              {currentRoute === '/post/create' && (
                <>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleBack}
                  >
                    <BackIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Create Post
                  </Typography></>
              )}
              {currentRoute === '/post/detail/1' && (
                <>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleBack}
                  >
                    <BackIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Post Detail
                  </Typography>
                </>
              )}
              {authToken && (
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
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </div>
  )
}
export default Header