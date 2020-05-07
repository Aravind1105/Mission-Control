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
});

export default gqlOrganization;
