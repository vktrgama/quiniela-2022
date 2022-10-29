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
  Authenticator,
} from "@aws-amplify/ui-react";
import { listMatches } from "../graphql/queries";
import {
  createMatches as createMatchesMutation,
  deleteMatches as deleteMatcheseMutation,
} from "../graphql/mutations";

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
      TypeA: 'home',
      TeamB: form.get("teamB"),
      TypeB: 'away',
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

  return (
    <View className="App">
      <Authenticator>
        { user.username === 'vktr-admin' &&
        <div>
            <p>Hello</p> {user.username}
            <Button onClick={signOut}>Sign Out</Button>
        </div>
        }
      </Authenticator>
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
            label="Match Visiting Team"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Match
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Matches</Heading>
      <View margin="3rem 0">
        {matches.map((match) => (
          <Flex
            key={match.Id}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {match.TeamA}
            </Text>
            <Text as="strong" fontWeight={700}>
              {match.TeamB}
            </Text>
            <Button variation="link" onClick={() => deleteNote(match)}>
              Delete Match
            </Button>
          </Flex>
        ))}
      </View>
    </View>
  );
};

export default withAuthenticator(Matches);