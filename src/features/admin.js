import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listMatches } from "../graphql/queries";
import {
  createMatches as createMatchesMutation,
  deleteMatches as deleteMatcheseMutation,
  updateMatches as updateMatchesMutation,
} from "../graphql/mutations";
import { useApp } from '../contexts/App';
import AdminScores from './admin-scores';

const Matches = ({ signOut, user }) => {
  const { appState } = useApp();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  async function fetchMatches() {
    const apiData = await API.graphql({ query: listMatches });
    const matchesFromAPI = apiData.data.listMatches.items;
    setMatches(matchesFromAPI);
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

  return (
    <View className="App">
        <Heading level={1}>World Cup Matches 2022</Heading>
        <h1>User: {appState.user.username || '<not found>' }</h1>
        <Button onClick={signOut}>Sign Out</Button>
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
                name="location"
                placeholder="Location"
                label="Stadium, Location"
                labelHidden
                variation="quiet"
            />
            <TextField
                name="schedule"
                placeholder="Date"
                label="Date"
                labelHidden
                variation="quiet"
            />
            <Button type="submit" variation="primary">
                Create Match
            </Button>
            </Flex>
        </View>

        <Heading level={2}>Update Final Scores</Heading>
        <AdminScores rows={matches} onDeleteMatch={deleteMatch} onUpdateMatch={updateMatch} />
    </View>
  );
};

export default withAuthenticator(Matches);