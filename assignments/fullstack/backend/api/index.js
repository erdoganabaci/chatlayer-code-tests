const { createServer } = require("http");
const express = require("express");
const { execute, subscribe } = require("graphql");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs, dateScalar } = require("./typedef");
const resolvers = require("./resolver");
require("dotenv").config();

let server;
const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 4040;

// graphql doesnt support scalar type such as Date so we need to implement external https://hasura.io/blog/working-with-dates-time-timezones-graphql-postgresql/
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    ...resolvers,
    Date: dateScalar,
  },
});

const startApolloServer = async (app, httpServer) => {
  server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });
  await server.start();
  server.applyMiddleware({ app, path: "/api/graphql" });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );
};

startApolloServer(app, httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
  );
});

module.exports = { httpServer, server };
