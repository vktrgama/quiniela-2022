import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { Heading } from "@aws-amplify/ui-react";
import { listMatchesResults } from "../graphql/queries";
import { API } from "aws-amplify";
import FlagImage from '../Components/FlagImage';
import { useLocation } from 'react-router-dom'

const ParticipantMatches = () => {
    const [rows, setRows] = React.useState([]);
    const [showSpinner, setSpinner] = React.useState(true)
    const location = useLocation()
    const { username } = location.state

    useEffect(() => {
       if (username) {
        fetchUserMatches();
       }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUserMatches = async () => {
        const filter = {
          and: [
              { Group: { eq: process.env.REACT_APP_GROUP } },
              { UserName: { eq: username } },
          ],
        };

        const userMatchedData = await API.graphql({ query: listMatchesResults, variables: { filter, limit: 4000 } });
        const userMatches = userMatchedData.data.listMatchesResults.items;
        userMatches.sort((a, b) => a.Match.Order - b.Match.Order);
        
        const rows = userMatches.length ? userMatches.map(m => {
          return {
            id: m.id,
            Match: m.Match.Order,
            TeamA: m.Match.TeamA,
            ScoreA: m.ScoreA,
            TeamB: m.Match.TeamB,
            ScoreB: m.ScoreB,
            Location: m.Match.Location,
            Date: m.Match.Schedule,
            Active: m.Match.Active
          }
        }) : [];
        setRows(rows);
        setSpinner(false);
    }

    const columns = [
        { field: 'Match', headerName: 'Match', editable: false, flex: 1, maxWidth: 90 },
        { field: 'home', headerName: 'Flag', editable: false, width: 20, renderCell: FlagImage },
        { field: 'TeamA', headerName: 'Team', width: 150, editable: false },
        { field: 'ScoreA', headerName: 'Score', type: 'number', editable: false },
        { field: 'away', headerName: 'Flag', editable: false, width: 20, renderCell: FlagImage },
        { field: 'TeamB', headerName: 'Team', width: 150, editable: false },
        { field: 'ScoreB', headerName: 'Score', type: 'number', editable: false },
        { field: 'Location', headerName: 'Location', width: 200, editable: false },
        { field: 'Date', headerName: 'Date', width: 150, editable: false },
    ];

    return (
      <Container maxWidth="lg">
          <Heading level={1}>{username} predictions</Heading>
          <Box sx={{ height: '75vh', marginTop: '15px' }}>
              <DataGrid
                editMode="row"
                rows={rows}
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

export default ParticipantMatches;