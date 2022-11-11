import React, { useEffect } from "react";
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import PopMsg from "../Components/PopMsg";
import ConfirmDialog from '../Components/ConfirmDialog'
import { withAuthenticator } from "@aws-amplify/ui-react";
import { listMatchesResults } from "../graphql/queries";
import { API } from "aws-amplify";
import asyncBatch from 'async-batch';
import { updateMatchesResults, createMatchesResults, deleteMatchesResults } from "../graphql/mutations";
import { getAllScores, initUserPoints, getUserScores } from './lib/utils'
import FlagImage from '../Components/FlagImage';

const UserMatches = ({ user }) => {
    const [rows, setRows] = React.useState([]);
    const [showSpinner, setSpinner] = React.useState(true)
    const [openAlert, setOpenAlert] = React.useState(false);
    const [pop, setPopMsg] = React.useState({ open: false, message: ''});

    useEffect(() => {
        if (Object.keys(user).length) {
            fetchUserMatches();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUserMatches = async () => {
        const filter = {
          and: [
              { Group: { eq: process.env.REACT_APP_GROUP } },
              { UserName: { eq: user.username } },
          ],
        };

        const userMatchedData = await API.graphql({ query: listMatchesResults, variables: { filter, limit: 200 } });
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
    
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
      };
    
    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit, fieldToFocus: 'ScoreA' } });
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
        if (!updRow.Active) {
            setOpenAlert(true);
            return;
        }

        const data = {
          id: updRow.id,
          ScoreA: updRow.ScoreA,
          ScoreB: updRow.ScoreB,
        };
        await API.graphql({
          query: updateMatchesResults,
          variables: { input: data },
        });

        const updatedRow = { ...updRow, isNew: false };
        setRows(rows.map((row) => (row.id === updRow.id ? updatedRow : row)));
        setPopMsg({ open: true, message: 'Score saved'});

        return updatedRow;
    };
    
    const removeActiveUserScores = async () => {
        const userScores = await getUserScores(user.username);
        const Parallelism = 4;
        const asyncMethod = async (result) => {
            if (result.Match.Active) {
                await API.graphql({
                    query: deleteMatchesResults,
                    variables: { input: { id: result.id } },
                });
            }
        };
  
        await asyncBatch(userScores, asyncMethod, Parallelism);
    }

    const createUserScores = async () => {
        const matches = await getAllScores();
        const Parallelism = 4;
        const asyncMethod = async (match) => {
          const data = {
              matchesResultsMatchId: match.id,
              ScoreA: 0,
              ScoreB: 0,
              UserName: user.username,
              Active: true,
              Group: process.env.REACT_APP_GROUP,
          };
          await API.graphql({
              query: createMatchesResults,
              variables: { input: data },
          });
        };
        await asyncBatch(matches, asyncMethod, Parallelism);
    }

    const handleGenerate = async () => {
        setSpinner(true);
        await removeActiveUserScores();
        await createUserScores();
        await initUserPoints(user.username);
        fetchUserMatches();
        setSpinner(false);
    }

    const columns = [
        { field: 'Match', headerName: 'Match', editable: false, flex: 1, maxWidth: 90 },
        { field: 'home', headerName: 'Flag', editable: false, width: 20, renderCell: FlagImage },
        { field: 'TeamA', headerName: 'Team', width: 150, editable: false },
        { field: 'ScoreA', headerName: 'Score', type: 'number', editable: true },
        { field: 'away', headerName: 'Flag', editable: false, width: 20, renderCell: FlagImage },
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
          getActions: (props) => {
            const id = props.id;
            const isActive = props.row.Active;
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
                  disabled={!isActive}
              />,
            ]
          },
        },
    ];

    const confirmMessage = `Be aware that this process will ERASE all the scores that are still ACTIVE (enabled pencil icon), those that are INACTIVE will remain, 
    and generate a new list of matches for you to enter scores. Do you want to proceed?`;
  
    const infoMessage = `Start by generating a list of games or matches for your account by pressing the [Generate List] button, 
          then you can start entering your predictions. Games for final brakets will be available at the time teams are determined.`;

    return (
      <Container maxWidth="lg">
          <PopMsg {...pop} setPopMsg={setPopMsg} />
          <div className="user-header">
              <div className="generate-scores">
                  <div>{infoMessage}</div>
                  <ConfirmDialog handleAgree={handleGenerate} message={confirmMessage} disabled={false} caption="Generate List"/>
              </div>
          </div>
          <Collapse in={openAlert}>
            <Alert action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CancelIcon fontSize="inherit" />
            </IconButton>
            }severity="error">You are not allowd to change scores anymore.</Alert>
          </Collapse>
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