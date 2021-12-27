import { Container, Grid, TextField, Button } from "@material-ui/core";
import { memo, useState } from "react";
import { useMutation } from "@apollo/client";
import SEND_MESSAGE from "../gql/mutations/sendMessage";

// Every time your application updates, memo will automatically perform a shallow comparison of props to determine
// if they've changed, and if the component needs to re-render.
const ChatBotSendMessages = memo(({ id, sendMessageCallback }) => {
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
      alert("Message can not be empty!");
    }
  };

  return (
    <Container style={{ marginBottom: "1rem" }}>
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
});

export default ChatBotSendMessages;
