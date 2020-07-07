import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import history from 'lib/history';

import requestInterceptor, { defaultOptions } from './service';
import BASE_URL from '../api';

const httpLink = new HttpLink({
  uri: `${BASE_URL}/products/graphql`,
});
const uploadLink = createUploadLink({
  uri: `${BASE_URL}/products/graphql`,
});
const cache = new InMemoryCache();

const gqlProducts = new ApolloClient({
  cache,
  defaultOptions,
  link: concat(requestInterceptor, uploadLink),
});

export default gqlProducts;
