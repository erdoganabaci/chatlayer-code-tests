import { memo } from "react";
import { Chip } from "@material-ui/core";

// Every time your application updates, memo will automatically perform a shallow comparison of props to determine
// if they've changed, and if the component needs to re-render.
const ChatBotListMessages = memo(({ combineActorClientMessages }) => {
  return (
    <div
      style={{
        padding: "1rem",
        marginBottom: "5rem",
        overflow: "auto",
        maxHeight: "100%",
      }}
    >
      {combineActorClientMessages &&
        combineActorClientMessages.map(({ text, actor }, index) => {
          return (
            <div
              key={index}
              style={{ textAlign: actor === "client" ? "right" : "left" }}
            >
              {/* <p style={{ marginBottom: "0.3rem" }}>{id}</p> */}
              {/* <p style={{ marginBottom: "0.3rem" }}>{actor}</p> */}

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
});

export default ChatBotListMessages;
