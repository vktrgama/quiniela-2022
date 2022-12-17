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
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
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

    const handlePaypal = () => {
        window.location = "https://www.paypal.com/donate/?hosted_button_id=FM3NTSGGXKBWJ";
    }

    return <div className='home'>
        <div className="hero">
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center' divider={<Divider orientation='vertical' flexItem />}>
                <div className='container-left'>
                    <h1>Welcome to Quiniela Qatar 2022</h1>
                    <div id="donate-button-container">
                        <h1 className='congrats'>Congratulations <span>{users && users.length ? users[0].name : ''}!</span> <span>you are the winner! $126.72 Dlls. will be send to you.</span></h1>
                        <div id="donate-button">
                            <p><b>(Para espaniol, usa el traductor de google que esta en la esquina inferior derecha)</b>.</p>
                            <p>To make it interesting, your participation requires a donation of $15.00, using the button below. FYI, PayPal takes a 3% (*) comission from it, so, the winner will get the rest (accumulated per participant), people with no donation will be removed when the turnament starts.</p>
                            <p>Winner takes all, no second or third place. Winner is the person with the higher number of points, if a draw happes, the person with more exact results with in the elimination brackets wins.</p>
                            <p><b>To start click [User Matches] from the menu above.</b></p>
                            <Button variant="contained" endIcon={<SendIcon />} onClick={handlePaypal}>Donate</Button>
                            <p><a href="https://www.paypal.com/webapps/mpp/merchant-fees" target="_new">PayPal comission details <b>here</b></a> under <i>Receiving and Sending Donations</i></p>
                        </div>
                    </div>
                </div>
                <div className='container-right'>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                    >
                    <div className='participants-list'>
                        <span className='participants-title'>List of participants ({users.length}):</span>
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
                    </div>
                </Stack>
                </div>
            </Stack>
        </div>
    </div>
    
}

export default Home;