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
import AdminScores from './admin-scores';
import NotAuth from '../Components/NotAuth';
import ConfirmDialog from '../Components/ConfirmDialog'
import PopMsg from "../Components/PopMsg";
import { listMatches } from "../graphql/queries";
import { createMatches, deleteMatches, updateMatches } from "../graphql/mutations";
import { calculateUserPoints } from './lib/utils'
import { useApp } from '../contexts/App';
import asyncBatch from 'async-batch';

const Matches = ({ user }) => {
  const { fetchParticipants } = useApp();
  const [matches, setMatches] = useState([]);
  const [showSpinner, setSpinner] = React.useState(false)
  const [alert, setAlert] = React.useState({open :false, message: ''});
  const [closeDisable, setDisabled] = React.useState(false);
  const [pop, setPopMsg] = React.useState({ open: false, message: ''});

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
      setSpinner(true);
      setDisabled(true);
      const Parallelism = 4;
      const asyncMethod = async (match) => {
          await API.graphql({
            query: updateMatches,
            variables: { input: {
                id: match.id,
                Active: false,
              }},
          });
      };

      await asyncBatch(matches, asyncMethod, Parallelism);
      fetchMatches();
      setDisabled(false)
      setSpinner(false);
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
      Active: true,
      Location: form.get("location"),
      Schedule: form.get("schedule"),
    };
    await API.graphql({
      query: createMatches,
      variables: { input: data },
    });
    fetchMatches();
    event.target.reset();
  }

  const deleteMatch = async (id) => {
    await API.graphql({
      query: deleteMatches,
      variables: { input: { id } },
    });
    const newMatches = matches.filter((match) => match.id !== id);
    setMatches(newMatches);
    setPopMsg({ open: true, message: 'Match deleted'});
  }

  const addNewMatch = (id) => {
      setMatches([...matches, { id, Order: matches.length + 1, isNew: true }]);
  }

  const cancelNewMatch = (id) => {
      const newRow = matches.filter((match) => match.id === id);
      if (newRow && newRow[0].isNew) {
          const restoreMatches = matches.filter((match) => match.id !== id);
          setMatches(restoreMatches);
      }
  }

  const saveNewMatch = async (newRow) => {
      const data = {
        TeamA: newRow.TeamA,
        TeamB: newRow.TeamB,
        Order: newRow.Order,
        ScoreA: 0,
        ScoreB: 0,
        Active: true,
        Location: newRow.Location,
        Schedule: newRow.Schedule,
      };
      await API.graphql({
        query: createMatches,
        variables: { input: data },
      });
      fetchMatches();
  }

  const updateMatch = async (updatedRow) => {
      const data = {
        id: updatedRow.id,
        ScoreA: updatedRow.ScoreA,
        ScoreB: updatedRow.ScoreB,
        Active: updatedRow.Active,
      };
      await API.graphql({
        query: updateMatches,
        variables: { input: data },
      });
      setMatches(matches.map((match) => (match.id === updatedRow.id ? updatedRow : match)));
  }

  const authorized = process.env.REACT_APP_WM && process.env.REACT_APP_WM.includes(`${user.attributes.sub}`)
  const confirmMessage = `This process will block all participants from making 
        any changes to their scores, do you want to continue?`;
  
  return authorized ? (
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
          <PopMsg {...pop} setPopMsg={setPopMsg} />
          <div className="admin-actions">
              <div>
                  <Button variant="outlined"  onClick={handleCalculation}>Calculate Points</Button>
              </div>
              <ConfirmDialog handleAgree={handleCloseScores} disabled={closeDisable} caption="Close Score Entering" message={confirmMessage} />
          </div>
          { showSpinner && <CircularProgress id='spinner' /> }
          <View as="form" id='add-match-form' margin="3rem 0" onSubmit={createMatch}>
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
          <AdminScores rows={matches} onDeleteMatch={deleteMatch} onUpdateMatch={updateMatch} onNewMatch={addNewMatch} onSaveMatch={saveNewMatch} onCancel={cancelNewMatch} />
      </View>
  ) : <NotAuth/>;
};

export default withAuthenticator(Matches);