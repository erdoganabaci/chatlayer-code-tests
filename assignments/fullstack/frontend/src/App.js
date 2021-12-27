// import "./App.css";
import ChatBotWrapper from "./components/ChatBotWrapper";
import { v4 as createUUID } from "uuid";
import styled from "styled-components";
import GlobalStyle from "./theme/globalStyles";

const id = createUUID();

const StyledDiv = styled.div`
  text-align: center;
  flex-direction: column;
  color: rgb(90, 90, 90);
  width: 100%;
  min-width: 100%;
  max-width: initial;
  display: flex;
  background-color: rgb(255, 255, 255);
  height: 100%;
  position: initial;
  min-height: 100vh;
`;

function App() {
  return (
    <StyledDiv className="App">
      <GlobalStyle />
      <ChatBotWrapper userId={id} />
    </StyledDiv>
  );
}

export default App;
