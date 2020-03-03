import { all, fork } from 'redux-saga/effects';

import { handleLoadKiosks, handleReset, handleOpen } from './kiosksSaga';
import modifyLoadCellSaga from './modifyLoadCell';

export default function* kiosksSaga() {
  yield all([
    fork(handleLoadKiosks),
    fork(handleReset),
    fork(handleOpen),
    fork(modifyLoadCellSaga),
  ]);
}
