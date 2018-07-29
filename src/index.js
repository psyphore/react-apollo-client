import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createClient, Auth } from './services/';
import { AppContext } from './HOC/appContext';

const client = createClient(
  process.env.REACT_APP_GRAPHQL_URI,
  process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS_URI
);

const Main = () => (
  <ApolloProvider client={client}>
    <AppContext.Provider
      value={{ title: process.env.REACT_APP_NAME, auth: Auth }}
    >
      <App />
    </AppContext.Provider>
  </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
