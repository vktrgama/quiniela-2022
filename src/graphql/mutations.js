/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMatches = /* GraphQL */ `
  mutation CreateMatches(
    $input: CreateMatchesInput!
    $condition: ModelMatchesConditionInput
  ) {
    createMatches(input: $input, condition: $condition) {
      id
      TeamA
      ScoreA
      TeamB
      ScoreB
      Order
      Schedule
      Location
      Active
      Year
      createdAt
      updatedAt
    }
  }
`;
export const updateMatches = /* GraphQL */ `
  mutation UpdateMatches(
    $input: UpdateMatchesInput!
    $condition: ModelMatchesConditionInput
  ) {
    updateMatches(input: $input, condition: $condition) {
      id
      TeamA
      ScoreA
      TeamB
      ScoreB
      Order
      Schedule
      Location
      Active
      Year
      createdAt
      updatedAt
    }
  }
`;
export const deleteMatches = /* GraphQL */ `
  mutation DeleteMatches(
    $input: DeleteMatchesInput!
    $condition: ModelMatchesConditionInput
  ) {
    deleteMatches(input: $input, condition: $condition) {
      id
      TeamA
      ScoreA
      TeamB
      ScoreB
      Order
      Schedule
      Location
      Active
      Year
      createdAt
      updatedAt
    }
  }
`;
export const createMatchesResults = /* GraphQL */ `
  mutation CreateMatchesResults(
    $input: CreateMatchesResultsInput!
    $condition: ModelMatchesResultsConditionInput
  ) {
    createMatchesResults(input: $input, condition: $condition) {
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
        Active
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
export const updateMatchesResults = /* GraphQL */ `
  mutation UpdateMatchesResults(
    $input: UpdateMatchesResultsInput!
    $condition: ModelMatchesResultsConditionInput
  ) {
    updateMatchesResults(input: $input, condition: $condition) {
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
        Active
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
export const deleteMatchesResults = /* GraphQL */ `
  mutation DeleteMatchesResults(
    $input: DeleteMatchesResultsInput!
    $condition: ModelMatchesResultsConditionInput
  ) {
    deleteMatchesResults(input: $input, condition: $condition) {
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
        Active
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
export const createUserPoints = /* GraphQL */ `
  mutation CreateUserPoints(
    $input: CreateUserPointsInput!
    $condition: ModelUserPointsConditionInput
  ) {
    createUserPoints(input: $input, condition: $condition) {
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
export const updateUserPoints = /* GraphQL */ `
  mutation UpdateUserPoints(
    $input: UpdateUserPointsInput!
    $condition: ModelUserPointsConditionInput
  ) {
    updateUserPoints(input: $input, condition: $condition) {
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
export const deleteUserPoints = /* GraphQL */ `
  mutation DeleteUserPoints(
    $input: DeleteUserPointsInput!
    $condition: ModelUserPointsConditionInput
  ) {
    deleteUserPoints(input: $input, condition: $condition) {
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
