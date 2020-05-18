import { fork, all } from 'redux-saga/effects';

import getSalesStatistic from './getSalesStatistic';

export default function* transactionsSaga() {
  yield all([fork(getSalesStatistic)]);
}
