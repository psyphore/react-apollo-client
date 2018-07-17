import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { withClientState } from 'apollo-link-state';
import { WebSocketLink } from 'apollo-link-ws';

const defaultState = {};

const createClient = function(uri) {
  const cache = new InMemoryCache();

  const stateLink = withClientState({ cache, defaults: defaultState });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:3081/graphql`,
    options: {
      reconnect: true
    }
  });

  const link = ApolloLink.from([
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
    new RetryLink({ delay: 5000, attempts: 5 }),
    new HttpLink({ uri: uri, credentials: 'same-origin' }),
    wsLink
  ]);

  const client = new ApolloClient({ link, cache });

  return client;
};

export default createClient;
