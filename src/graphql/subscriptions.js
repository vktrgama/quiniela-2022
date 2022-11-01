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
      Match {
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
      ScoreA
      ScoreB
      Active
      Year
      Group
      createdAt
      updatedAt
      matchesResultsMatchId
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
      Match {
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
      ScoreA
      ScoreB
      Active
      Year
      Group
      createdAt
      updatedAt
      matchesResultsMatchId
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
      Match {
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
      ScoreA
      ScoreB
      Active
      Year
      Group
      createdAt
      updatedAt
      matchesResultsMatchId
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
      Group
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
      Group
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
      Group
      createdAt
      updatedAt
    }
  }
`;
