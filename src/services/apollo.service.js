import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { withClientState } from 'apollo-link-state';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createUploadLink } from 'apollo-upload-client';

import Auth from './security.service';

const defaultState = {};

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all'
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  },
  mutate: {
    errorPolicy: 'all'
  }
};

const auth = new Auth();

export const createClient = (uri, ws) => {
  const cache = new InMemoryCache();

  const stateLink = withClientState({ cache, defaults: defaultState });

  // https://blog.apollographql.com/batching-client-graphql-queries-a685f5bcd41b
  // import { BatchHttpLink } from "apollo-link-batch-http";
  // const batchHttpLink = new BatchHttpLink({ uri, headers: { batch: "true " } });

  const wsLink = new WebSocketLink({
    uri: ws,
    options: {
      reconnect: true,
      connectionParams: {
        authorization: auth.getAuthorizationHeader()
      }
    }
  });

  const uploadLink = createUploadLink({
    credentials: 'same-origin',
    headers: {
      authorization: auth.getAuthorizationHeader()
    },
    uri
  });

  const httpLink = new HttpLink({
    uri,
    credentials: 'same-origin'
  });

  const retryLink = new RetryLink({ delay: 5000, attempts: 2 });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: auth.getAuthorizationHeader()
      }
    });

    return forward(operation);
  });

  const errorHandler = onError(errObj => {
    console.log(errObj);
    const { graphQLErrors, networkError } = errObj;
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  const splitter = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const link = ApolloLink.from([
    errorHandler,
    authMiddleware,
    stateLink,
    retryLink,
    uploadLink,
    splitter
  ]);

  return new ApolloClient({
    link,
    cache,
    defaultOptions,
    queryDeduplication: true,
    ssrMode: false,
    connectToDevTools: true
  });
};
