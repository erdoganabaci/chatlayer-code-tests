import { memo, useEffect, useRef } from "react";
import { Chip } from "@material-ui/core";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: 100%;
`;

const StyledActorTextAlignDiv = styled.div`
  text-align: ${(props) => (props.actor === "client" ? "right" : "left")};
`;

const StyledChip = styled(Chip)`
  & span {
    font-size: 1rem;
  }

  color: rgb(141, 141, 141) !important;
  background-color: rgb(245, 249, 252) !important;
`;

// Every time your application updates, memo will automatically perform a shallow comparison of props to determine
// if they've changed, and if the component needs to re-render.
const ChatBotListMessages = memo(({ combineActorClientMessages }) => {
  // select last dom element scroll bottom when new message received
  const messagesEndRef = useRef();
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [combineActorClientMessages]);

  return (
    <StyledDiv data-testid={"user-message-list"}>
      {combineActorClientMessages &&
        combineActorClientMessages.map(({ text, actor }, index) => {
          return (
            <StyledActorTextAlignDiv key={index} actor={actor}>
              {/* <p style={{ marginBottom: "0.3rem" }}>{id}</p> */}
              {/* <p style={{ marginBottom: "0.3rem" }}>{actor}</p> */}

              <StyledChip
                color={actor === "client" ? "primary" : "secondary"}
                label={text}
              />
            </StyledActorTextAlignDiv>
          );
        })}
      <div ref={messagesEndRef} />
    </StyledDiv>
  );
});

export default ChatBotListMessages;
