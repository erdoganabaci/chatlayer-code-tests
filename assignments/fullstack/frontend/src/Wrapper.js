import { useState, useEffect } from "react";
import { useSubscription, gql } from "@apollo/client";
import {
  ChatBotSendMessages,
  ChatBotListMessages,
} from "./ChatBotListMessages";

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

const Wrapper = ({ userId }) => {
  const [messages, setMessages] = useState([]);

  const { data, loading, error } = useSubscription(GET_MESSAGES, {
    variables: { userId },
  });

  const sendMessageCallback = (chatMessage) => {
    setMessages([...messages, chatMessage]);
  };

  useEffect(() => {
    if (data) {
      setMessages([...messages, data.subscribeChat]);
    }
  }, [data]);

  console.log("appdata messages", messages);

  return (
    <div>
      <ChatBotListMessages combineActorClientMessages={messages} />
      <ChatBotSendMessages
        id={userId}
        sendMessageCallback={sendMessageCallback}
      />
    </div>
  );
};

export default Wrapper;
