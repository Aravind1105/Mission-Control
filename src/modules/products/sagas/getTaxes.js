import ls from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';

export default function handlerGetTaxes() {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  return fetch('/api/v1/taxes', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}
