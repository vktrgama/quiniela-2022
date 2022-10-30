/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMatches = /* GraphQL */ `
  query GetMatches($id: ID!) {
    getMatches(id: $id) {
      id
      TeamA
      ScoreA
      TeamB
      ScoreB
      Order
      Schedule
      Location
      Year
      createdAt
      updatedAt
    }
  }
`;
export const listMatches = /* GraphQL */ `
  query ListMatches(
    $filter: ModelMatchesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        TeamA
        ScoreA
        TeamB
        ScoreB
        Order
        Schedule
        Location
        Year
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMatchesResults = /* GraphQL */ `
  query GetMatchesResults($id: ID!) {
    getMatchesResults(id: $id) {
      id
      UserName
      MatchId
      TeamA
      ScoreA
      TeamB
      ScoreB
      Year
      Group
      createdAt
      updatedAt
    }
  }
`;
export const listMatchesResults = /* GraphQL */ `
  query ListMatchesResults(
    $filter: ModelMatchesResultsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMatchesResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        UserName
        MatchId
        TeamA
        ScoreA
        TeamB
        ScoreB
        Year
        Group
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserPoints = /* GraphQL */ `
  query GetUserPoints($id: ID!) {
    getUserPoints(id: $id) {
      id
      UserName
      Total
      Active
      Year
      Group
      createdAt
      updatedAt
    }
  }
`;
export const listUserPoints = /* GraphQL */ `
  query ListUserPoints(
    $filter: ModelUserPointsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        UserName
        Total
        Active
        Year
        Group
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
