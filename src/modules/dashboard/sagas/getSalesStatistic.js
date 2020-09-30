import { call, put, takeEvery } from 'redux-saga/effects';
import groupBy from 'lodash/groupBy';

import gqlReports from 'lib/https/gqlReports';
import { formatData, days } from './formatData';
import {
  getSalesStatistic as action,
  getSalesStatisticSuccess as actionSuccess,
} from '../actions';
import {
  GET_HOURLY_SALES_STATISTIC_QUERY,
  GET_DAILY_SALES_STATISTIC_QUERY,
  GET_DAILY_SALES_BY_KIOSKS,
  GET_WEEKLY_SALES_BY_KIOSKS,
} from '../schema';

const query = {
  last24Hours: GET_HOURLY_SALES_STATISTIC_QUERY,
  last7Days: GET_DAILY_SALES_STATISTIC_QUERY,
};
const queryGlobal = {
  last24Hours: GET_DAILY_SALES_BY_KIOSKS,
  last7Days: GET_WEEKLY_SALES_BY_KIOSKS,
};

// TODO: Change daily: 'dailySales' to daily: 'hourlySales' after mock removed

const queryKey = {
  last24Hours: 'hourlySalesByKiosk',
  last7Days: 'dailySalesByKiosk',
};

const queryKeyGlobal = {
  last7Days: 'dailySales',
  last24Hours: 'hourlySales',
};

function getLastWeek() {
  // computing the first day in last 7 days
  const date = new Date();
  date.setDate(date.getDate() - 6);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

  // week format computation for the last 7 days
  let weekFormat = [];
  for (let i = 0; i < 7; i += 1) {
    const itrDate = new Date(date);
    itrDate.setDate(itrDate.getDate() + i);
    weekFormat.push(days[itrDate.getDay()]);
  }
  weekFormat = weekFormat.map(elem => ({ date: elem }));
  return { lastWeekDate: date, lastWeekFormat: weekFormat };
}

function* handler({ payload: { kioskId, time } }) {
  const variables = kioskId ? { kioskId } : {};
  try {
    const { data } = yield call(gqlReports.query, {
      query: kioskId ? query[time] : queryGlobal[time],
      variables,
    });
    const products = [];
    const queryName = kioskId ? queryKey[time] : queryKeyGlobal[time];
    const selector = '_id.date';
    /* eslint-disable */

    data[queryName].forEach(elem => {
      if (time === 'last24Hours') {
        elem._id.date = elem._id.date.split('T')[1].split(':')[0];
      } else {
        elem._id.dateString = elem._id.date;
        elem._id.date = days[new Date(elem._id.date).getDay()];
      }
    });

    let weekFormat;
    if (time === 'last7Days') {
      const { lastWeekDate, lastWeekFormat } = getLastWeek();
      // filter last 7 days including current date
      data[queryName] = data[queryName].filter(elem => lastWeekDate < new Date(elem._id.dateString));
      // sort the dates
      data[queryName] = data[queryName].sort((firstDate, secondDate) => new Date(firstDate._id.dateString) - new Date(secondDate._id.dateString));
      // week day ordering 
      weekFormat = lastWeekFormat;
    }

    /* eslint-enable */
    const formatted = groupBy(data[queryName], selector);
    const res = Object.keys(formatted).map(key => {
      const obj = formatted[key].reduce((prev, { amount, _id }) => {
        const value = Math.round(amount * 100) / 100;
        const kiosk = (_id.kiosk ? _id.kiosk : '') || 'All Fridges';
        const sum = prev[kiosk] || 0;
        if (!products.includes(kiosk)) {
          products.push(kiosk);
        }
        const total = (+sum + +value).toFixed(2);
        return {
          ...prev,
          [kiosk]: total,
        };
      }, {});
      return {
        name: key,
        ...obj,
      };
    });
    const dataArray = formatData(res, time, kioskId, weekFormat);
    yield put(actionSuccess({ statistic: dataArray, products }));
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeEvery(action, handler);
}
