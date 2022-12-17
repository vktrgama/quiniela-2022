import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { useApp } from '../contexts/App'
import { calculateUserPoints } from './lib/utils'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Participants = () => {
    const { fetchParticipants, appState } = useApp();
    const [showSpinner, setSpinner] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [calcResults, setCalcResults] = React.useState([]);

    useEffect(() => {
        fetchParticipants();
        setSpinner(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleCalculations = async (userName) => {
        setSpinner(true);
        const results = await calculateUserPoints(userName);
        const sortedResults = results[0];
        sortedResults.sort((a, b) => a.id - b.id);
        setCalcResults(sortedResults);
        setOpen(true);
        setSpinner(false);
    }

    const columns = [
      { field: 'name', headerName: 'Participant', editable: false, flex: 1 },
      { field: 'totalPoints', headerName: 'Total Points', flex: 0.3, editable: false },
      { field: 'home', headerName: 'See others predictions', editable: false, flex: 1, renderCell: (parms) => {
        return<IconButton component={Link} state={{ username: parms.row.name }} sx={{ position: 'relative', left: '45px'}}
                to="/participant-matches" size='large' edge='end' color='inherit' aria-label='logo'>
            <SportsSoccerIcon />
        </IconButton>
      }},
      { field: 'away', headerName: 'See calculatoins', editable: false, flex: 1, renderCell: (parms) => {
        return<IconButton sx={{ position: 'relative', left: '45px'}} onClick={() => { handleCalculations(parms.row.name) }}
                size='large' edge='end' color='inherit' aria-label='logo'>
            <CalculateIcon />
        </IconButton>
      }},
    ];

    const calcColumns = [
      { field: 'teamA', headerName: 'TeamA', editable: false, flex: 1 },
      { field: 'teamB', headerName: 'TeamB', editable: false, flex: 1 },
      { field: 'userScores', headerName: 'User', editable: false, flex: 1 },
      { field: 'realScores', headerName: 'Real', editable: false, flex: 1 },
      { field: 'points', headerName: 'Points', editable: false, flex: 1 },
      { field: 'totalPoints', headerName: 'Total', editable: false, flex: 1 },
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
        <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'md'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Calculations"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: '80vh', width: '550px', marginTop: '15px' }}>
            <DataGrid
                rows={calcResults}
                columns={calcColumns}
                experimentalFeatures={{ newEditingApi: true }}
                onProcessRowUpdateError={(error) => console.log(error)}
                hideFooterSelectedRowCount={true}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
  );
}

export default Participants;