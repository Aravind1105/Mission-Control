import ls from 'lib/localStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';

export default function updatePrice(id, payload) {
  const token = ls.getItem(TOKEN_STORAGE_KEY);

  return fetch(`/api/v1/product-lines/${id}/updatePrice`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
