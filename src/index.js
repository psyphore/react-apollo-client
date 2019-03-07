import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import {
  enableExperimentalFragmentVariables,
  disableFragmentWarnings
} from 'graphql-tag';

import './assets/css/index.css';

import App from './App';
import { createClient } from './services';
import { AppProvider, NotificationProvider } from './HOC';
import { SharedSnackbarProvider } from './components/alert/SnackBarProvider';
import { SharedFileManagerProvider } from './components/fileManager/FileManagerProvider';

const client = createClient(
  process.env.REACT_APP_GRAPHQL_URI,
  process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS_URI
);

const Main = () => (
  <ApolloProvider client={client}>
    <AppProvider>
      <SharedFileManagerProvider>
        <NotificationProvider>
          <SharedSnackbarProvider>
            <App />
          </SharedSnackbarProvider>
        </NotificationProvider>
      </SharedFileManagerProvider>
    </AppProvider>
  </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
enableExperimentalFragmentVariables();
disableFragmentWarnings();
