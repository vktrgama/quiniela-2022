import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Flex,
  Heading,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CancelIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { listMatches } from "../graphql/queries";
import {
  createMatches as createMatchesMutation,
  deleteMatches as deleteMatcheseMutation,
  updateMatches as updateMatchesMutation,
  updateMatchesResults
} from "../graphql/mutations";
import AdminScores from './admin-scores';
import NotAuth from '../Components/NotAuth';
import Progress from '../Components/Progress';
import ConfirmDialog from '../Components/ConfirmDialog'
import { calculateUserPoints, getAllScores } from './lib/utils'
import { useApp } from '../contexts/App';

const Matches = ({ user }) => {
  const { fetchParticipants } = useApp();
  const [matches, setMatches] = useState([]);
  const [showSpinner, setSpinner] = React.useState(false)
  const [progress, setProgress] = React.useState(0);
  const [alert, setAlert] = React.useState({open :false, message: ''});
  const [closeDisable, setDisabled] = React.useState(false);

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleCalculation = async () => {
    try {
        setSpinner(true);
        await calculateUserPoints(user.username);
        fetchParticipants();
    } catch(e) {
        setAlert({ open: true, message: e.errors[0].message})
    }
    setSpinner(false);
  }

  const handleCloseScores = async () => {
    setDisabled(true);
    const matches = await getAllScores();
    for (const m in matches) {
        const percent = m * 100 / matches.length;
        await API.graphql({
        query: updateMatchesResults,
        variables: { input: {
            id: matches[m].id,
            Active: false,
            }},
        });
        setProgress(percent);
    }
    setDisabled(false)
    setProgress(0);
  }

  async function fetchMatches() {
    const filter = { Year: { eq: process.env.REACT_APP_YEAR } };
    const apiData = await API.graphql({ query: listMatches, variables: { filter } });
    const matches = apiData.data.listMatches.items;
    matches.sort((a, b) => a.Order - b.Order);
    setMatches(matches);
  }

  async function createMatch(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      TeamA: form.get("teamA"),
      TeamB: form.get("teamB"),
      Order: form.get("order"),
      ScoreA: 0,
      ScoreB: 0,
      Location: form.get("location"),
      Schedule: form.get("schedule"),
    };
    await API.graphql({
      query: createMatchesMutation,
      variables: { input: data },
    });
    fetchMatches();
    event.target.reset();
  }

  const deleteMatch = async (id) => {
    await API.graphql({
      query: deleteMatcheseMutation,
      variables: { input: { id } },
    });
    const newMatches = matches.filter((match) => match.id !== id);
    setMatches(newMatches);
  }

  const updateMatch = async (updatedRow) => {
    const data = {
      id: updatedRow.id,
      ScoreA: updatedRow.ScoreA,
      ScoreB: updatedRow.ScoreB,
    };
    await API.graphql({
      query: updateMatchesMutation,
      variables: { input: data },
    });
    setMatches(matches.map((match) => (match.id === updatedRow.id ? updatedRow : match)));
  }

  const confirmMessage = `This process will block all participants to make 
        any changes to their scores, do you want to continue?`;

  return user.username === process.env.REACT_APP_WM ? (
      <View className="App">
          <Heading level={1}>World Cup Qatar 2022</Heading>
          <Collapse in={alert.open}>
            <Alert action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert({ open: false, message: ''});
              }}
            >
              <CancelIcon fontSize="inherit" />
            </IconButton>
            }severity="error">{alert.message}</Alert>
          </Collapse>
          <div className="admin-actions">
              <Button variant="outlined"  onClick={handleCalculation}>Calculate Points</Button>
              <ConfirmDialog handleAgree={handleCloseScores} disabled={closeDisable} caption="Close Score Entering" message={confirmMessage} />
              <Progress progress={progress} />
          </div>
          { showSpinner && <CircularProgress id='spinner' /> }
          <View as="form" margin="3rem 0" onSubmit={createMatch}>
              <Flex direction="row" justifyContent="center">
              <TextField
                  name="order"
                  placeholder="Match Number"
                  label="Match Number"
                  labelHidden
                  variation="quiet"
                  required
              />
              <TextField
                  name="teamA"
                  placeholder="Match Team A"
                  label="Match Home Team"
                  labelHidden
                  variation="quiet"
                  required
              />
              <TextField
                  name="teamB"
                  placeholder="Match Team B"
                  label="Match Away Team"
                  labelHidden
                  variation="quiet"
                  required
              />
              <TextField
                  name="schedule"
                  placeholder="Date"
                  label="Date"
                  labelHidden
                  variation="quiet"
              />
              <TextField
                  name="location"
                  placeholder="Location"
                  label="Stadium, Location"
                  labelHidden
                  variation="quiet"
              />
              
              <Button type="submit" variation="primary">
                  Add a match
              </Button>
              </Flex>
          </View>

          <Heading level={2}>Update Final Scores</Heading>
          <AdminScores rows={matches} onDeleteMatch={deleteMatch} onUpdateMatch={updateMatch} />
      </View>
  ) : <NotAuth/>;
};

export default withAuthenticator(Matches);