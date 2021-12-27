import { gql } from "@apollo/client";

const GET_MESSAGES = gql`
  subscription SubscribeChat($userId: String!) {
    subscribeChat(userId: $userId) {
      id
      text
      actor
      timestamp
    }
  }
`;

export default GET_MESSAGES;
