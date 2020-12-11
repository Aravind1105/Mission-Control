import { all, fork } from 'redux-saga/effects';

import createApiKeySaga from './createApiKeySaga';
import deleteApiKeySaga from './deleteApiKeySaga';
import loadApiKeySaga from './loadApiKeySaga';

export default function* kiosksSaga() {
  yield all([fork(createApiKeySaga)]);
  yield all([fork(deleteApiKeySaga)]);
  yield all([fork(loadApiKeySaga)]);
}
