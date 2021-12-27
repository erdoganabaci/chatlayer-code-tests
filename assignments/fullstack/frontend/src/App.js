import "./App.css";
import ChatBotWrapper from "./components/ChatBotWrapper";
import { v4 as createUUID } from "uuid";
const id = createUUID();
console.log("process.env.REACT_APP_HTTP_LINK", process.env.REACT_APP_HTTP_LINK);

function App() {
  return (
    <div className="App">
      <ChatBotWrapper userId={id} />
    </div>
  );
}

export default App;
