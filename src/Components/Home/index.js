import React, { useEffect } from "react";
import {
    Stack, Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
  } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useApp } from '../../contexts/App'
import './home.css';

const Home = () => {
    const { appState, fetchParticipants } = useApp();
    const { users } = appState;

    useEffect(() => {
        if (users && users.length === 0) {
            fetchParticipants();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className='home'>
        <div className="hero">
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center' divider={<Divider orientation='vertical' flexItem />}>
                <div className='container-left'>
                    <h1>Welcome to Quiniela Qatar 2022</h1>
                </div>
                <div className='container-right'>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                    >
                    <span>List of participants:</span>
                    <List dense sx={{ width: '300px', maxWidth: 360 }}>
                        {users.map((p, idx) => (
                            <ListItem key={idx}>
                                <ListItemAvatar>
                                <Avatar>
                                    <AccountCircleIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline', fontSize: '18px' }}
                                                component="span"
                                                variant="body2"
                                                color="white"
                                            >
                                                {p.name}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="white"
                                            >
                                                {p.totalPoints} points
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        ))} 
                    </List>
                </Stack>
                </div>
            </Stack>
        </div>
    </div>
    
}

export default Home;