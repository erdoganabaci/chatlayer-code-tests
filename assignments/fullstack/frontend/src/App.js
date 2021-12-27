import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
  HttpLink,
  s,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import Wrapper from "./Wrapper";

import { v4 as createUUID } from "uuid";

const id = createUUID();

const httpLink = new HttpLink({
  uri: "http://localhost:4040/graphql",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4040/graphql`,
  options: {
    reconnect: true,
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="header">
          <h2 className="header">Echo Bot</h2>
        </div>
        <Wrapper userId={id} />
      </div>
    </ApolloProvider>
  );
}

export default App;
