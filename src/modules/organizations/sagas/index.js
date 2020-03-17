import { all, fork } from 'redux-saga/effects';

import getOrganizationsSaga from './getOrganizations';
import addOrganizationSaga from './addOrganization';

export default function* kiosksSaga() {
  yield all([fork(getOrganizationsSaga), fork(addOrganizationSaga)]);
}
