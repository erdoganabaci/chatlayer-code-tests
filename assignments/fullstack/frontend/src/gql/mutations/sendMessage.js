import { gql } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation Mutation(
    $sendChatId: String!
    $text: String!
    $timestamp: Date!
    $actor: String!
  ) {
    sendChat(
      id: $sendChatId
      text: $text
      timestamp: $timestamp
      actor: $actor
    ) {
      id
      text
      timestamp
      actor
    }
  }
`;

export default SEND_MESSAGE;
