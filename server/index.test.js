import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import gql from "graphql-tag";
import rushingAPI from "./datasources/rushing";
import { createTestClient } from "apollo-server-testing";

const dataSources = () => ({ rushingAPI });
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  introspection: true,
  playground: true
});

const TEST_QUERY = gql`
  {
    entries {
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

describe("ApolloServer", () => {
  it("should return fetch data correctly", async () => {
    const { query } = createTestClient(server);
    const res = await query({ query: TEST_QUERY });
    expect(res).toMatchSnapshot();
  });
});
