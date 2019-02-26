import { all } from 'redux-saga/effects';

import coreSaga from './sagas/core';

// Shared sagas
import authenticateSaga from 'modules/authentication/sagas/authenticate';

const sagas = [authenticateSaga(), coreSaga()];

export default function* rootSaga() {
  yield all(sagas);
}
