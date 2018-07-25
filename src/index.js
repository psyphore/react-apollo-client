import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createClient } from './services/';

const client = createClient(
  process.env.REACT_APP_GRAPHQL_URI,
  process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS_URI
);

const ws = {};

const Main = () => (
  <ApolloProvider client={client}>
    <App {...ws} />
  </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
