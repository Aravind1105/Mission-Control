import { all, delay, put, takeEvery } from 'redux-saga/effects';
import {
  ORGANIZATIONS_SAGA_LOAD,
  updateOrganizations,
} from '../actions/organizationsActions';
import { organizationsTableMockData } from '../mocks/organziationsMocks';

function* loadOrganizations() {
  yield delay(500);
  yield put(updateOrganizations(organizationsTableMockData));
}

function* handleLoadOrganizations() {
  yield takeEvery(ORGANIZATIONS_SAGA_LOAD, loadOrganizations);
}

export default function* organizationsSaga() {
  yield all([handleLoadOrganizations()]);
}
