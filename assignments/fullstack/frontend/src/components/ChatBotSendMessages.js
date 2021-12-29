import { Grid, TextField, Button } from "@material-ui/core";
import { memo, useState } from "react";
import { useMutation } from "@apollo/client";
import SEND_MESSAGE from "../gql/mutations/sendMessage";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  & fieldset {
    border-radius: 3rem;
  }

  & input {
    font-size: 1em;
    background-color: rgb(255, 255, 255);
    color: rgb(90, 90, 90);
    border-radius: 2em;
    overflow: hidden;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 3rem !important;
  background-color: rgb(37, 206, 209) !important;
  color: white !important;
  margin-right: auto !important;
`;

const StyledGridContainer = styled(Grid)`
  width: 100%;
  padding: 1rem;
`;
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
    <StyledGridContainer container spacing={2}>
      <Grid item xs={11}>
        <StyledTextField
          data-testid={"user-input"}
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
          label="Required Message"
          placeholder="Write reply ..."
        />
      </Grid>
      <Grid item xs={1}>
        <StyledButton
          data-testid={"user-button"}
          onClick={onSendMessage}
          fullWidth
          variant="contained"
        >
          Send
        </StyledButton>
      </Grid>
    </StyledGridContainer>
  );
});

export default ChatBotSendMessages;
