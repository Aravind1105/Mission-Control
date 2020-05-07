import { all, fork } from 'redux-saga/effects';

import getOrganizationsSaga from './getOrganizations';
import modifyOrganizationSaga from './modifyOrganization';

export default function* kiosksSaga() {
  yield all([fork(getOrganizationsSaga), fork(modifyOrganizationSaga)]);
}
