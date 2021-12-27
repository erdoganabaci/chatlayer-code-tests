import { useState, useEffect } from "react";
import { useSubscription } from "@apollo/client";
import ChatBotListMessages from "./ChatBotListMessages";
import ChatBotSendMessages from "./ChatBotSendMessages";
import GET_MESSAGES from "../gql/subscriptions/getMessages";
import styled from "styled-components";

const StyledInputButtonWrapperDiv = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const StyledHeaderDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledH1 = styled.h1`
  background-color: rgb(37, 206, 209);
  color: rgb(255, 255, 255);
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 3rem;
  margin: 0;
`;

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
    <StyledInputButtonWrapperDiv>
      <StyledHeaderDiv>
        <StyledH1>EchoBot</StyledH1>
      </StyledHeaderDiv>
      <ChatBotListMessages combineActorClientMessages={messages} />
      <ChatBotSendMessages
        id={userId}
        sendMessageCallback={sendMessageCallback}
      />
    </StyledInputButtonWrapperDiv>
  );
};

export default ChatBotWrapper;
