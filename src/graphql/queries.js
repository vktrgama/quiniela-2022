/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMatches = /* GraphQL */ `
  query GetMatches($id: ID!) {
    getMatches(id: $id) {
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
        TypeA
        TeamB
        TypeB
        Year
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
