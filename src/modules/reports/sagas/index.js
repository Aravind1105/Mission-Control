import { all, fork } from 'redux-saga/effects';

import getReports from './getReports';

export default function* reportsSaga() {
  yield all([fork(getReports)]);
}
