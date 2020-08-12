import { fork, all } from 'redux-saga/effects';

import getSalesStatistic from './getSalesStatistic';
import getWidgetTodayData from './getWidgetTodayData';
import getWidgetMonthlyData from './getWidgetMonthlyData';

export default function* transactionsSaga() {
  yield all([fork(getSalesStatistic), fork(getWidgetTodayData), fork(getWidgetMonthlyData)]);
}
