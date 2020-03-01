import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    sortBy: String!
    filter: String
    topCursor: Int
    bottomCursor: Int
  }
`;

export const resolvers = {};
