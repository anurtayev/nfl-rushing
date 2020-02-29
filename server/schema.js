import { gql } from "apollo-server";

export default gql`
  type Query {
    entries(
      sortBy: String
      filter: String
      pageSize: Int
      cursor: Int
      direction: String
    ): [PlayerRecord]!
  }

  type PlayerRecord {
    id: ID
    player: String
    team: String
    pos: String
    attg: Float
    att: Int
    yds: Int
    avg: Float
    ydsg: Float
    td: Int
    lng: String
    first: Int
    firstPercentage: Float
    twentyPlus: Int
    fortyPlus: Int
    fum: Int
  }
`;
