import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import LivelloLS from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  ORGANIZATIONS_SAGA_LOAD,
  updateOrganizations,
  ORGANIZATIONS_SAGA_ADD,
} from '../actions/organizationsActions';

function* loadOrganizations() {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(fetch, '/api/v1/organizations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = yield call([response, response.json]);

  yield put(updateOrganizations(data));
}

function* addOrganization(action) {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
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

function* handleAddOrganizations() {
  yield takeEvery(ORGANIZATIONS_SAGA_ADD, addOrganization);
}

function* handleLoadOrganizations() {
  yield takeEvery(ORGANIZATIONS_SAGA_LOAD, loadOrganizations);
}

export default function* organizationsSaga() {
  yield all([handleLoadOrganizations(), handleAddOrganizations()]);
}
