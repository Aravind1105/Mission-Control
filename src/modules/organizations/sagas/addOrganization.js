import { call, takeEvery } from 'redux-saga/effects';
import ls from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import { ORGANIZATIONS_SAGA_ADD } from '../actions';

function* addOrganization(action) {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(fetch, '/api/v1/organizations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.payload),
  });

  const data = yield call([response, response.json]);

  console.log(data);
  // yield put(updateOrganizations([data]));
  // TODO Update organization by id if exists
}

export default function* handleAddOrganizations() {
  yield takeEvery(ORGANIZATIONS_SAGA_ADD, addOrganization);
}
