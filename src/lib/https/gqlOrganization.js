import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { concat } from 'apollo-link';

import requestInterceptor, { defaultOptions } from './service';
import BASE_URL from '../api';

const httpLink = new HttpLink({
  uri: `${BASE_URL}/organizations/graphql`,
});
const cache = new InMemoryCache();
const gqlOrganization = new ApolloClient({
  cache,
  defaultOptions,
  link: concat(requestInterceptor, httpLink),

  onError: (({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error ------>]: Message: ${JSON.stringify(message)}, Location: ${JSON.stringify(locations)}, Path: ${path}`
        )
      );
    }
    if (networkError) {
      console.log(`[Network error ------>,]: ${JSON.stringify(networkError)}`);
    }
  })
})

export default gqlOrganization;
