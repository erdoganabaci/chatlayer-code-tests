import { useState, useEffect } from "react";
import { useSubscription } from "@apollo/client";
import ChatBotListMessages from "./ChatBotListMessages";
import ChatBotSendMessages from "./ChatBotSendMessages";
import GET_MESSAGES from "../gql/subscriptions/getMessages";

const ChatBotWrapper = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  // subscribe each message instantly via Websocket
  const { data } = useSubscription(GET_MESSAGES, {
    variables: { userId },
  });
  const sendMessageCallback = (chatMessage) => {
    setMessages([...messages, chatMessage]);
  };

  useEffect(() => {
    if (data) {
      setMessages([...messages, data.subscribeChat]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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

export default ChatBotWrapper;
