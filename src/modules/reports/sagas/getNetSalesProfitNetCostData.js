/* eslint-disable import/named */
import { call, put, takeLatest } from 'redux-saga/effects';

import gqlReports from 'lib/https/gqlReports';
import { GET_NET_SALES_PROFIT_COST_DATA } from '../schema';
import {
  getNetSalesProfitNetCostData,
  getNetSalesProfitCostDataSuccess,
} from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  const startDateOfMonth = new Date(
    new Date(new Date().setHours(0, 0, 0)).setDate(1),
  );
  try {
    const {
      data: { dailyProfitByKiosks },
      errors,
    } = yield call(gqlReports.query, {
      query: GET_NET_SALES_PROFIT_COST_DATA,
      variables: {
        period:
          payload && payload.period
            ? {
                from: payload.period.$gte,
                to: payload.period.$lte,
              }
            : {
                from: startDateOfMonth,
                to: new Date(),
              },
        kioskId: payload.kioskId,
        kioskIds: payload && payload.kioskId,
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        getNetSalesProfitCostDataSuccess({
          netSalesProfitCostData: dailyProfitByKiosks || [],
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getNetSalesProfitNetCostData, handler);
}
