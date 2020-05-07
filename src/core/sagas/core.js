import { all, call, put, takeLatest } from 'redux-saga/effects';

import { renewSession } from 'modules/authentication/sagas/authenticate';
import { initializeI18n } from './i18n';
import { initializeApp, setAppInitialized } from '../actions/coreActions';

function* handler() {
  yield call(renewSession);
  yield call(initializeI18n);
  yield put(setAppInitialized(true));
}

function* watchInitialize() {
  yield takeLatest(initializeApp, handler);
}

export default function* initializeSaga() {
  yield all([watchInitialize()]);
}
