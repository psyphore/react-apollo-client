import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import {
  enableExperimentalFragmentVariables,
  disableFragmentWarnings
} from 'graphql-tag';

import App from './App';
import { createClient } from './services';
import { AppProvider, NotificationProvider } from './HOC';
import { SharedSnackbarProvider } from './components/alert/SnackBarProvider';

const client = createClient(
  process.env.REACT_APP_GRAPHQL_URI,
  process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS_URI
);

const Main = () => (
  <ApolloProvider client={client}>
    <AppProvider>
      <NotificationProvider>
        <SharedSnackbarProvider>
          <App />
        </SharedSnackbarProvider>
      </NotificationProvider>
    </AppProvider>
  </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
enableExperimentalFragmentVariables();
disableFragmentWarnings();
