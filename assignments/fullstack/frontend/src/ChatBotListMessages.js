import { useMutation, useSubscription, gql } from "@apollo/client";
import { Container, Chip, Grid, TextField, Button } from "@material-ui/core";
import { memo, useState, useCallback, useEffect } from "react";

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

// Every time your application updates, memo will automatically perform a shallow comparison of props to determine
// if they've changed, and if the component needs to re-render.
export const ChatBotListMessages = ({ combineActorClientMessages }) => {
  return (
    <div style={{ marginBottom: "5rem" }}>
      {combineActorClientMessages &&
        combineActorClientMessages.map(({ id, text, actor }, index) => {
          return (
            <div
              key={index}
              style={{ textAlign: actor === "client" ? "right" : "left" }}
            >
              {/* <p style={{ marginBottom: "0.3rem" }}>{id}</p> */}
              <p style={{ marginBottom: "0.3rem" }}>{actor}</p>

              <Chip
                style={{ fontSize: "0.9rem" }}
                color={actor === "client" ? "primary" : "secondary"}
                label={text}
              />
            </div>
          );
        })}
    </div>
  );
};

export const ChatBotSendMessages = ({ id, sendMessageCallback }) => {
  const timestamp = Date.now();
  const [text, setText] = useState(""); //initialize text
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const onSendMessage = () => {
    if (text.length > 0) {
      //calls the mutate function
      sendMessage({
        variables: { sendChatId: id, text, actor: "bot", timestamp },
      });
      sendMessageCallback({ id, text, actor: "client", timestamp });
      setText(""); //reset text field
    } else {
      alert("Missing fields!");
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <TextField
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                onSendMessage();
              }
            }}
            value={text}
            size="small"
            fullWidth
            variant="outlined"
            required
            label="Required"
            placeholder="Enter message here"
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={onSendMessage}
            fullWidth
            variant="contained"
            style={{ backgroundColor: "rgb(37, 206, 209)", color: "white" }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
