import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listMatches } from "../graphql/queries";
import {
  createMatches as createMatchesMutation,
  deleteMatches as deleteMatcheseMutation,
} from "../graphql/mutations";
import { Input } from "@mui/material";

const Matches = ({ signOut, user }) => {
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
      Order: form.get("sort"),
      ScoreA: 0,
      ScoreB: 0,
      Schedule: '',
      Location: '',
      Year: 2022,
    };
    await API.graphql({
      query: createMatchesMutation,
      variables: { input: data },
    });
    fetchMatches();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const newNotes = matches.filter((note) => note.id !== id);
    setMatches(newNotes);
    await API.graphql({
      query: deleteMatcheseMutation,
      variables: { input: { id } },
    });
  }

  return user.username === process.env.REACT_APP_WM ? (
    <View className="App">
        <Heading level={1}>World Cup Matches 2022</Heading>
        <View as="form" margin="3rem 0" onSubmit={createMatch}>
            <Flex direction="row" justifyContent="center">
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
            <Input name="sort" label="Sort" variation="quiet" required/>
            <Button type="submit" variation="primary">
                Create Match
            </Button>
            </Flex>
        </View>

        <Heading level={2}>Current Matches</Heading>
        <View margin="3rem 0">
            {matches.map((match) => (
            <Flex
                key={match.id}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Text as="strong">
                {match.TeamA}
                </Text>
                <Text as="strong">
                {match.TeamB}
                </Text>
                <Text as="strong">
                {match.Order}
                </Text>
                <Button variation="link" onClick={() => deleteNote(match)}>
                Delete Match
                </Button>
            </Flex>
            ))}
        </View>
    </View>
  ) : <h1>You are not authorized, to see this</h1>;
};

export default withAuthenticator(Matches);