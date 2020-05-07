import { ApolloLink } from 'apollo-link';

import ls from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';

const requestInterceptor = new ApolloLink((operation, forward) => {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

export const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export default requestInterceptor;
