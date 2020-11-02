import { fork, all } from 'redux-saga/effects';

import getKioskSalesStatistics from './getKioskSalesStatistics';
import getWidgetTodayData from './getWidgetTodayData';
import getWidgetMonthlyData from './getWidgetMonthlyData';

export default function* transactionsSaga() {
  yield all([fork(getKioskSalesStatistics), fork(getWidgetTodayData), fork(getWidgetMonthlyData)]);
}
