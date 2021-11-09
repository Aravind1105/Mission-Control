import { all, fork } from 'redux-saga/effects';

import getWidgetData from './getWidgetData';
import getNetSalesProfitCostData from './getNetSalesProfitNetCostData';
import getTopSellingKiosks from './getTopSellingKiosks';
import getTopSellingProducts from './getTopSellingProducts';
import getTopSellHours from './getTopSellHours';

export default function* reportsSaga() {
  yield all([
    fork(getWidgetData),
    fork(getTopSellingKiosks),
    fork(getTopSellingProducts),
    fork(getNetSalesProfitCostData),
    fork(getTopSellHours),
  ]);
}
