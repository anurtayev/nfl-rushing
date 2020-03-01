import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    sortBy: String!
    filter: String
  }
`;

export const resolvers = {};
