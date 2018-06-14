import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
// import { SubscriptionClient } from 'subscriptions-transport-ws';
 
const createClient = function(uri, ws) {
  // const subscriptionClient = new SubscriptionClient(ws || process.env.REACT_APP_GRAPHQL_SUB_URI, {
  //   reconnect: true,
  // });

  const client = new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) => console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
              
          if (networkError) console.error(`[Network error]: ${networkError}`);
        }),
        new HttpLink({ uri: uri, credentials: 'same-origin' })
      ]),
      cache: new InMemoryCache(),
      // networkInterface: subscriptionClient
    });

  return client;
}

export {createClient};