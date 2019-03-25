import { all } from 'redux-saga/effects';

import coreSaga from './sagas/core';
import languageSaga from './sagas/i18n';

// Shared sagas
import authenticateSaga from 'modules/authentication/sagas/authenticate';
import organizationsSaga from 'modules/organizations/sagas/organizationsSaga';

const sagas = [
  authenticateSaga(),
  coreSaga(),
  languageSaga(),
  organizationsSaga(),
];

export default function* rootSaga() {
  yield all(sagas);
}
