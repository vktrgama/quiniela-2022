import * as React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography, useTheme, useMediaQuery } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import { useApp } from '../../contexts/App';
import SideNavbar from '../SideNavbar';
import UserAvatar from '../Avatar';
import './navbar.css'

export default function BasicMenu() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { appState } = useApp();
    
    return (
    <AppBar position='static'>
        {isMobile ? (
            <SideNavbar />
        ) : (
            <Toolbar>
                <IconButton component={Link} to="/" size='large' edge='start' color='inherit' aria-label='logo'>
                    <SportsSoccerIcon />
                </IconButton>
                <Typography align='left' variant='h6' component='div' sx={{ flexGrow: 1}}>
                    <Link className='appTitleLink' to="/">Quiniela Qatar 2022</Link>
                </Typography>
                <Stack direction='row' spacing={2}>
                    {appState.navigation.map((nav, idx) => (
                        <Button key={idx} component={Link} to={nav.path} color='inherit'>
                            {nav.title}
                        </Button>
                    ))}
                    <UserAvatar />
                </Stack>
            </Toolbar>
        )}
    </AppBar>
    )
}