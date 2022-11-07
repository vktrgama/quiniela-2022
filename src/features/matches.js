import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { listMatches } from "../graphql/queries";
import { API } from "aws-amplify";

const ListMatches = () => {
    const [rows, setRows] = React.useState([]);
    const [showSpinner, setSpinner] = React.useState(true)

    useEffect(() => {
        fetchMatches();
    }, []);

    async function fetchMatches() {
      const filter = { and: [
        { Year: { eq: process.env.REACT_APP_YEAR } },
      ]};
      const apiData = await API.graphql({ query: listMatches, variables: { filter } });
      const matchesFromAPI = apiData.data.listMatches.items;
      matchesFromAPI.sort((a, b) => a.Order - b.Order);

      const rows = matchesFromAPI.map(m => {
        return {
          id: m.id,
          Match: m.Order,
          TeamA: m.TeamA,
          ScoreA: m.ScoreA,
          TeamB: m.TeamB,
          ScoreB: m.ScoreB,
          Location: m.Location,
          Date: m.Schedule
        }
      });
      setRows(rows);
      setSpinner(false);
    }
    
    const columns = [
      { field: 'Match', headerName: 'Match', editable: false, flex: 1, maxWidth: 90 },
      { field: 'TeamA', headerName: 'Team', width: 150, editable: false },
      { field: 'ScoreA', headerName: 'Score', type: 'number', editable: false },
      { field: 'TeamB', headerName: 'Team', width: 150, editable: false },
      { field: 'ScoreB', headerName: 'Score', type: 'number', editable: false },
      { field: 'Location', headerName: 'Location', width: 200, editable: false },
      { field: 'Date', headerName: 'Date', width: 150, editable: false },
    ];

    return (
      <Container maxWidth="lg">
        <Box sx={{ height: '80vh', marginTop: '15px' }}>
          <DataGrid
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

export default ListMatches;