const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const chats = [];

// Resolver map
const resolvers = {
  Query: {
    chats() {
      return chats;
    },
  },

  Mutation: {
    sendChat(_, { id, text, timestamp }) {
      // each channel should have a unique name because we block to publish all channel
      const chat = { id, text, timestamp };
      // If you want to query via chat array store all chat.
      chats.push(chat);
      // publish to unique user channel
      pubsub.publish(chat.id, { subscribeChat: chat });
      return chat;
    },
  },

  Subscription: {
    subscribeChat: {
      subscribe(_, { userId }) {
        // receive subscription chat from unique userId
        return pubsub.asyncIterator(userId);
      },
    },
  },
};

module.exports = resolvers;
