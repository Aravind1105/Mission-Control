import { all, fork } from 'redux-saga/effects';

import createApiKeySaga from './createApiKeySaga';

export default function* kiosksSaga() {
  yield all([fork(createApiKeySaga),]);
}
