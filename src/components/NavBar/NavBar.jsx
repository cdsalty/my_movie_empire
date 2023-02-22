import React, { useState, useEffect } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, userSelector } from '../../features/auth';
import { Search, SideBar } from '..';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import useStyles from './styles';

const NavBar = () => {
  // Bring in the user's state from redux
  const { isAuthenticated, user } = useSelector(userSelector);
  console.log('User coming from the navbar user: ', user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  // check if the screen size is larger than 600px, if it is, then it is not mobile.
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const dispatch = useDispatch();
  // const isAuthenticated = false; not needed anymore since we put it in the redux state

  const token = localStorage.getItem('request_token');
  const sessionIdComingFromLocalStorage = localStorage.getItem('session_id');
  // only run this effect if the token changes
  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIdComingFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdComingFromLocalStorage}`
          );
          console.log(
            'the userData is coming from the sessionIdComingFromLocalStorage: ',
            userData
          );
          dispatch(setUser(userData));
        } else {
          // when first using it, you won't have a session id, so you need to create one
          const sessionId = await createSessionId();
          console.log('New sessionId created: ', sessionId);
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          console.log('the userData is coming from the sessionId: ', userData);
          // The next step is to dispatch the setIser amd pass it userData, to keep it in redux state
          dispatch(setUser(userData));
        }
      }
    };
    loginUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prev) => !prev)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={() => console.log('Clicked the Second Icon Button')}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {/* If not on mobile... */}
          {/* Search Functionality/Search Component */}
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button
                color="inherit"
                // onClick={() => console.log('is not authenticated button')}
                onClick={fetchToken}
              >
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/:id`}
                className={classes.linkButton}
                onClick={() =>
                  console.log('Else is the athenicated button clicked')
                }
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile Picture"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prev) => !prev)} // Corre ct way to toggle state
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;

// I get access to the theme object in the component from the ThemeProvider inside index.js

/*
refernece the notes for steps regarding dispatching the userData to redux state

*/
