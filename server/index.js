import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";

import typeDefs from "./schema";
import resolvers from "./resolvers";

import rushingAPI from "./datasources/rushing";

dotenv.config();

export const dataSources = () => ({ rushingAPI });
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  introspection: true,
  playground: true
});

server.listen({ port: process.env.DEFAULT_PORT || 4000 }).then(({ url }) => {
  console.log(`Rushing GrapQL server is running at ${url}`);
});
