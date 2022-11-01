import React, { useEffect } from "react";
import { listUserPoints } from "../../graphql/queries";
import { API } from "aws-amplify";
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
import './home.css';

const Home = () => {
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        fetchParticpants();
    }, []);

    async function fetchParticpants() {
      const apiData = await API.graphql({ query: listUserPoints });
      const userList = apiData.data.listUserPoints.items;

      userList.sort((a, b) => a.Order - b.Order);
      const rows = userList.map(u => {
        return {
          id: u.id,
          name: u.UserName,
          totalPoints: u.Total,
        }
      });
      setRows(rows);
    }

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
                        {rows.map((p, idx) => (
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