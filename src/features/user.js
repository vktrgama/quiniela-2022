import React, { useEffect } from "react";
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { listMatchesResults } from "../graphql/queries";
import { API } from "aws-amplify";
import {
  updateMatchesResults as updateMatchesMutation,
} from "../graphql/mutations";
import ConfirmDialog from '../Components/ConfirmDialog'
import { useApp } from '../contexts/App';
import { generateScores } from './lib/utils'

const UserMatches = () => {
    const { appState } = useApp();
    const [rows, setRows] = React.useState([]);
    const [showSpinner, setSpinner] = React.useState(true)

    useEffect(() => {
        if (Object.keys(appState.user).length) {
            fetchMatches();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchMatches = async () => {
        const apiData = await API.graphql({ query: listMatchesResults });
        const userMatches = apiData.data.listMatchesResults.items;
        const matches = userMatches.filter(m => m.UserName === appState.user.username);
        matches.sort((a, b) => a.Match.Order - b.Match.Order);
        
        const rows = matches.length ? matches.map(m => {
          return {
            id: m.id,
            Match: m.Match.Order,
            TeamA: m.Match.TeamA,
            ScoreA: m.ScoreA,
            TeamB: m.Match.TeamB,
            ScoreB: m.ScoreB,
            Location: m.Match.Location,
            Date: m.Match.Schedule
          }
        }) : [];
        setRows(rows);
        setSpinner(false);
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

    const processRowUpdate = async (updRow) => {
        const data = {
          id: updRow.id,
          ScoreA: updRow.ScoreA,
          ScoreB: updRow.ScoreB,
        };
        await API.graphql({
          query: updateMatchesMutation,
          variables: { input: data },
        });

        const updatedRow = { ...updRow, isNew: false };
        setRows(rows.map((row) => (row.id === updRow.id ? updatedRow : row)));
        return updatedRow;
    };
    
    const handleGenerate = async () => {
        setSpinner(true);
        await generateScores(appState.user.username);
        fetchMatches();
    }

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
          <div className="user-header">
              <div>Generate your quiniela and start entering your scores:</div>
              {/* <Button variant="outlined" onClick={handleGenerate}>Generate</Button> */}
              <ConfirmDialog handleAgree={handleGenerate} />
          </div>
          <Box sx={{ height: '75vh', marginTop: '15px' }}>
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
          { showSpinner && <CircularProgress id='spinner' /> }
      </Container>
  );
}

export default withAuthenticator(UserMatches);