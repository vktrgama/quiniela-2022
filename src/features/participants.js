import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { useApp } from '../contexts/App'

const Participants = () => {
    const { fetchParticipants, appState } = useApp();
    const [showSpinner, setSpinner] = React.useState(true)

    useEffect(() => {
        fetchParticipants();
        setSpinner(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
      { field: 'name', headerName: 'Participant', editable: false, flex: 1, maxWidth: 200 },
      { field: 'totalPoints', headerName: 'Total Points', flex: 0.5, width: 150, editable: false },
      { field: 'home', headerName: 'See others predictions', editable: false, width: 200, renderCell: (parms) => {
        return<IconButton component={Link} state={{ username: parms.row.name }} sx={{ position: 'relative', left: '45px'}}
                to="/participant-matches" size='large' edge='end' color='inherit' aria-label='logo'>
            <SportsSoccerIcon />
        </IconButton>
      }},
    ];

    return (
      <Container maxWidth="sm">
        <Box sx={{ height: '80vh', marginTop: '15px' }}>
          <DataGrid
            rows={appState.users}
            columns={columns}
            experimentalFeatures={{ newEditingApi: true }}
            onProcessRowUpdateError={(error) => console.log(error)}
            hideFooterSelectedRowCount={true}
          />
        </Box>
        { showSpinner && <CircularProgress id='spinner' /> }
      </Container>
  );
}

export default Participants;