import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton
} from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from "react-router-dom";
import { useApp } from '../../contexts/App';
import { Auth } from 'aws-amplify';
import './sidenavbar.css'

const SideNavbar = ({ user }) => {
  const { appState, Logout } = useApp();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleSignOut = () => {
    Logout();
    Auth.signOut();
  }

  const authorized = process.env.REACT_APP_WM && user.attributes && process.env.REACT_APP_WM.includes(`${user.attributes.sub}`)

  return (
    <>
      <Drawer open={openDrawer}  onClose={() => setOpenDrawer(false)}>
      <List>
          <ListItem key={0} onClick={() => setOpenDrawer(false)}>
            <ListItemText>
                <IconButton component={Link} to="/" size='small' edge='start' color='inherit' aria-label='logo'>
                    <SportsSoccerIcon />Home
                </IconButton>
            </ListItemText>
          </ListItem>
          {appState.navigation.map((nav, idx) => (
              <ListItem key={idx} onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                      <Button component={Link} to={nav.path} color='inherit'>
                          <ArrowForwardIosIcon />{nav.title}
                      </Button>
                  </ListItemText>
              </ListItem>
          ))}
          { authorized ?
            <ListItem key={appState.navigation.length + 1} onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <IconButton component={Link} to="/admin" size='small' edge='start' color='inherit' aria-label='logo'>
                    <ArrowForwardIosIcon />Admin
                </IconButton>
              </ListItemText>
            </ListItem> : ''
          }
          { Object.keys(user).length ?
            <ListItem key={appState.navigation.length + 2} onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Button variant="text" onClick={handleSignOut}>Logout</Button>
              </ListItemText>
            </ListItem> : ''
          }
      </List>
      </Drawer>
      <IconButton className='menuIcon' onClick={() => setOpenDrawer(!openDrawer)} edge='start' color='inherit' aria-label='menu'>
        <MenuIcon />
      </IconButton>
    </>
  );
}

export default SideNavbar;