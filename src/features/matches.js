import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Flex,
  Heading,
  Text,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listMatches } from "../graphql/queries";

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

  return (
    <View className="App">
      <Heading level={1}>World Cup Matches 2022</Heading>
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
          </Flex>
        ))}
      </View>
    </View>
  );
};

export default withAuthenticator(Matches);