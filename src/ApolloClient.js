import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { RestLink } from 'apollo-link-rest'
// import { SubscriptionClient } from 'subscriptions-transport-ws';
 
const createClient = function(uri, ws) {
  // const networkInterface = new SubscriptionClient(ws || process.env.REACT_APP_GRAPHQL_SUB_URI, {
  //   reconnect: true,
  // });

  const rest = new RestLink({
    endpoints: {
     old: 'http://dev.icomply.api/', 
    },
    headers: {
      'content-type': 'application/json',
      'authorization': '123'
    }
  });

  const link = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) => console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
          
      if (networkError) console.error(`[Network error]: ${networkError}`);
    }),
    new RetryLink({
      delay: 5000,
      attempts: 5
    }),
    new HttpLink({ uri: uri, credentials: 'same-origin' })
  ]);

  const cache = new InMemoryCache();

  const client = new ApolloClient({
      link,
      cache,
      // networkInterface
    });

  return client;
}

const REST_QUERY_BASIC = `
  query RestData {
    users @rest(route: '/users') @type(type: 'User[]') {
      firstName
    }
  }
`;

export default createClient;