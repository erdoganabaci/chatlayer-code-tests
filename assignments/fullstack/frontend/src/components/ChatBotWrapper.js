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
    <div
      style={{
        minHeight: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 className="header">EchoBot</h1>
      </div>
      <ChatBotListMessages combineActorClientMessages={messages} />
      <ChatBotSendMessages
        id={userId}
        sendMessageCallback={sendMessageCallback}
      />
    </div>
  );
};

export default ChatBotWrapper;
