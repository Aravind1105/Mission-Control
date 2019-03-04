import { all } from 'redux-saga/effects';

import coreSaga from './sagas/core';
import languageSaga from './sagas/i18n';

// Shared sagas
import authenticateSaga from 'modules/authentication/sagas/authenticate';

const sagas = [authenticateSaga(), coreSaga(), languageSaga()];

export default function* rootSaga() {
  yield all(sagas);
}
