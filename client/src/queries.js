import { gql } from "apollo-boost";

export const ENTRIES = gql`
  query GetEntries(
    $sortBy: String
    $filter: String
    $cursor: Int
    $direction: String
  ) {
    entries(
      sortBy: $sortBy
      filter: $filter
      cursor: $cursor
      direction: $direction
    ) {
      id
      player
      team
      pos
      attg
      att
      yds
      avg
      ydsg
      td
      lng
      first
      firstPercentage
      twentyPlus
      fortyPlus
      fum
    }
  }
`;

export const GET_LOCAL_STATE = gql`
  query GetLocalState {
    sortBy @client
    filter @client
    filterInput @client
    cursor @client
    direction @client
  }
`;
