import { all, fork } from 'redux-saga/effects';

import getWidgetData from './getWidgetData';
import getNetSalesProfitCostData from './getNetSalesProfitNetCostData';
import getTopSellingKiosks from './getTopSellingKiosks';

export default function* reportsSaga() {
  yield all([
    fork(getWidgetData),
    fork(getTopSellingKiosks),
    fork(getNetSalesProfitCostData),
  ]);
}
