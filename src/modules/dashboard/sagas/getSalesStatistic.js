import { call, put, takeEvery } from 'redux-saga/effects';
import groupBy from 'lodash/groupBy';

import gqlReports from 'lib/https/gqlReports';
import {
  getSalesStatistic as action,
  getSalesStatisticSuccess as actionSuccess,
} from '../actions';
import {
  GET_HOURLY_SALES_STATISTIC_QUERY,
  GET_DAILY_SALES_STATISTIC_QUERY,
  GET_WEEKLY_SALES_STATISTIC_QUERY,
  GET_MONTHLY_SALES_STATISTIC_QUERY,
} from '../schema';

const query = {
  hourly: GET_HOURLY_SALES_STATISTIC_QUERY,
  daily: GET_DAILY_SALES_STATISTIC_QUERY,
  weekly: GET_WEEKLY_SALES_STATISTIC_QUERY,
  monthly: GET_MONTHLY_SALES_STATISTIC_QUERY,
};
const queryKey = {
  hourly: 'hourlySalesByKiosk',
  daily: 'dailySalesByKiosk',
  weekly: 'weeklySalesByKiosk',
  monthly: 'monthlySalesByKiosk',
};

function* handler({ payload: { kioskId, time } }) {
  const variables = kioskId ? { kioskId } : {};
  try {
    const { data } = yield call(gqlReports.query, {
      query: query[time],
      variables,
    });

    const products = [];
    const queryName = queryKey[time];
    const selector = kioskId ? '_id.line.name' : '_id.kiosk';
    const formatted = groupBy(data[queryName], selector);
    const res = Object.keys(formatted).map(key => {
      const obj = formatted[key].reduce((prev, { amount, _id }) => {
        const value = Math.round(amount * 100) / 100;
        const productName = (_id.line ? _id.line.name : '') || 'unknown';
        const sum = prev[productName] || 0;
        if (!products.includes(productName)) {
          products.push(productName);
        }
        const total = Math.round(((sum + value) * 100) / 100);
        return {
          ...prev,
          [productName]: total,
        };
      }, {});

      return {
        name: key,
        ...obj,
      };
    });
    yield put(actionSuccess({ statistic: res, products }));
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeEvery(action, handler);
}
