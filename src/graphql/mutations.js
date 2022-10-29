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
      TypeA
      TeamB
      TypeB
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
      TypeA
      TeamB
      TypeB
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
      TypeA
      TeamB
      TypeB
      Year
      createdAt
      updatedAt
    }
  }
`;
