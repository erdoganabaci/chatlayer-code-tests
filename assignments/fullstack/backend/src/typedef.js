const { gql } = require("apollo-server-express");

// Schema definition
const typeDefs = gql`
  type ChatBot {
    id: String!
    text: String!
    timestamp: Int!
  }

  type Query {
    chats: [ChatBot]
  }

  type Mutation {
    sendChat(id: String!, text: String!, timestamp: Int!): ChatBot
  }

  type Subscription {
    subscribeChat(userId: String!): ChatBot
  }
`;

module.exports = typeDefs;
