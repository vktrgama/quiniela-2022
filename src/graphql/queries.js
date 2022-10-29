/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMatches = /* GraphQL */ `
  query GetMatches($id: ID!, $Order: Int!) {
    getMatches(id: $id, Order: $Order) {
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
    $id: ID
    $Order: ModelIntKeyConditionInput
    $filter: ModelMatchesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMatches(
      id: $id
      Order: $Order
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
