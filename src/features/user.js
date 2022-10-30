import React, { useEffect } from "react";
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { listMatches } from "../graphql/queries";
import { API } from "aws-amplify";
import {
  updateMatches as updateMatchesMutation,
} from "../graphql/mutations";

const UserMatches = () => {
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        fetchMatches();
    }, []);

    async function fetchMatches() {
      const apiData = await API.graphql({ query: listMatches });
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
    }
    
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
      };
    
    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        const data = {
          id: newRow.id,
          ScoreA: newRow.ScoreA,
          ScoreB: newRow.ScoreB,
        };
        await API.graphql({
          query: updateMatchesMutation,
          variables: { input: data },
        });

        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };
    
    const columns = [
        { field: 'Match', headerName: 'Match', editable: false, flex: 1, maxWidth: 90 },
        { field: 'TeamA', headerName: 'Team', width: 150, editable: false },
        { field: 'ScoreA', headerName: 'Score', type: 'number', editable: true },
        { field: 'TeamB', headerName: 'Team', width: 150, editable: false },
        { field: 'ScoreB', headerName: 'Score', type: 'number', editable: true },
        { field: 'Location', headerName: 'Location', width: 200, editable: false },
        { field: 'Date', headerName: 'Date', width: 150, editable: false },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          width: 100,
          flex: 0.3,
          cellClassName: 'actions',
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
            return [
                <GridActionsCellItem
                  icon={<SaveIcon />}
                  label="Save"
                  onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                  icon={<CancelIcon />}
                  label="Cancel"
                  className="textPrimary"
                  onClick={handleCancelClick(id)}
                  color="inherit"
                />,
            ];
            }

            return [
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
            />,
            ];
          },
        },
      ];

    return (
      <Container maxWidth="lg">
        <Box sx={{ height: '80vh', marginTop: '15px' }}>
          <DataGrid
            editMode="row"
            rows={rows}
            columns={columns}
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(error) => console.log(error)}
            rowModesModel={rowModesModel}
            onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            hideFooterSelectedRowCount={true}
          />
        </Box>
      </Container>
  );
}

export default withAuthenticator(UserMatches);