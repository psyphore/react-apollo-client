import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { withClientState } from 'apollo-link-state';
import { WebSocketLink } from 'apollo-link-ws';
// import { SubscriptionClient } from 'subscriptions-transport-ws';

import Auth from './security.service';

const defaultState = {};

const auth = new Auth();

export const createClient = (uri, ws) => {
  const cache = new InMemoryCache();

  const stateLink = withClientState({ cache, defaults: defaultState });

  // const wsClient = new SubscriptionClient(ws, {
  //   reconnect: true,
  //   connectionParams: () => ({ authToken: auth.getAuthorizationHeader() })
  // });

  // const wsLink = new WebSocketLink(wsClient);

  const wsLink = new WebSocketLink({
    uri: ws,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: auth.getAuthorizationHeader()
      }
    }
  });

  const httpLink = new HttpLink({ uri: uri, credentials: 'same-origin' });

  const retryLink = new RetryLink({ delay: 5000, attempts: 2 });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: auth.getAuthorizationHeader()
      }
    });

    return forward(operation);
  });

  const link = ApolloLink.from([
    authMiddleware,
    stateLink,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );

      if (networkError) console.error(`[Network error]: ${networkError}`);
    }),
    retryLink,
    httpLink,
    wsLink
  ]);

  const client = new ApolloClient({ link, cache });

  return client;
};
