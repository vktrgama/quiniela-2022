import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { listUserPoints } from "../graphql/queries";
import { API } from "aws-amplify";

const Participants = () => {
    const [rows, setRows] = React.useState([]);
    const [showSpinner, setSpinner] = React.useState(true)

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
      setSpinner(false);
    }
    
    const columns = [
      { field: 'name', headerName: 'Participant', editable: false, flex: 1, maxWidth: 200 },
      { field: 'totalPoints', headerName: 'Total Points', flex: 0.5, width: 150, editable: false },
      ];

    return (
      <Container maxWidth="sm">
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

export default withAuthenticator(Participants);