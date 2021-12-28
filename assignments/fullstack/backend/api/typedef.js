const { gql } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

// implement graphql date scalar type
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

// Schema definition
const typeDefs = gql`
  scalar Date

  type ChatBot {
    id: String!
    text: String!
    actor: String!
    timestamp: Date!
  }

  type Query {
    chats: [ChatBot]
  }

  type Mutation {
    sendChat(
      id: String!
      text: String!
      actor: String!
      timestamp: Date!
    ): ChatBot
  }

  type Subscription {
    subscribeChat(userId: String!): ChatBot
  }
`;

module.exports = { typeDefs, dateScalar };
