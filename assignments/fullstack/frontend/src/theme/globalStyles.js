import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 html,
body,
#root {
  margin: 0;
  font-family: "Work Sans", sans-serif;
  font-size: 14px;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
`;

export default GlobalStyle;
