/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMatches = /* GraphQL */ `
  subscription OnCreateMatches($filter: ModelSubscriptionMatchesFilterInput) {
    onCreateMatches(filter: $filter) {
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
export const onUpdateMatches = /* GraphQL */ `
  subscription OnUpdateMatches($filter: ModelSubscriptionMatchesFilterInput) {
    onUpdateMatches(filter: $filter) {
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
export const onDeleteMatches = /* GraphQL */ `
  subscription OnDeleteMatches($filter: ModelSubscriptionMatchesFilterInput) {
    onDeleteMatches(filter: $filter) {
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
export const onCreateMatchesResults = /* GraphQL */ `
  subscription OnCreateMatchesResults(
    $filter: ModelSubscriptionMatchesResultsFilterInput
  ) {
    onCreateMatchesResults(filter: $filter) {
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
export const onUpdateMatchesResults = /* GraphQL */ `
  subscription OnUpdateMatchesResults(
    $filter: ModelSubscriptionMatchesResultsFilterInput
  ) {
    onUpdateMatchesResults(filter: $filter) {
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
export const onDeleteMatchesResults = /* GraphQL */ `
  subscription OnDeleteMatchesResults(
    $filter: ModelSubscriptionMatchesResultsFilterInput
  ) {
    onDeleteMatchesResults(filter: $filter) {
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
export const onCreateUserPoints = /* GraphQL */ `
  subscription OnCreateUserPoints(
    $filter: ModelSubscriptionUserPointsFilterInput
  ) {
    onCreateUserPoints(filter: $filter) {
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
export const onUpdateUserPoints = /* GraphQL */ `
  subscription OnUpdateUserPoints(
    $filter: ModelSubscriptionUserPointsFilterInput
  ) {
    onUpdateUserPoints(filter: $filter) {
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
export const onDeleteUserPoints = /* GraphQL */ `
  subscription OnDeleteUserPoints(
    $filter: ModelSubscriptionUserPointsFilterInput
  ) {
    onDeleteUserPoints(filter: $filter) {
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
