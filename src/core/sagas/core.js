import { all, call, put, takeEvery } from 'redux-saga/effects';
import { CORE_SAGA_INIT, setAppInitialized } from '../actions/coreActions';
import { renewSession } from 'modules/authentication/sagas/authenticate';

function* initialize() {
  yield call(renewSession);
  yield put(setAppInitialized(true));
}

function* watchInitialize() {
  yield takeEvery(CORE_SAGA_INIT, initialize);
}

export default function* initializeSaga() {
  yield all([watchInitialize()]);
}
