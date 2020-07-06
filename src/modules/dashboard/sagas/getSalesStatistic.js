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
  GET_WEEKLY_SALES_STATISTIC_QUERY,
  GET_MONTHLY_SALES_STATISTIC_QUERY,
  GET_DAILY_SALES_BY_KIOSKS,
  GET_WEEKLY_SALES_BY_KIOSKS,
} from '../schema';

const query = {
  daily: GET_DAILY_SALES_STATISTIC_QUERY,
  weekly: GET_WEEKLY_SALES_STATISTIC_QUERY,
};
const queryGlobal = {
  daily: GET_DAILY_SALES_BY_KIOSKS,
  weekly: GET_WEEKLY_SALES_BY_KIOSKS,
};

// TODO: Change daily: 'dailySales' to daily: 'hourlySales' after mock removed

const queryKey = {
  daily: 'dailySalesByKiosk',
  weekly: 'dailySalesByKiosk',
};

const queryKeyGlobal = {
  weekly: 'dailySales',
  daily: 'dailySales',
};

function* handler({ payload: { kioskId, time } }) {
  // TODO: Remove this line after mock removed
  kioskId = kioskId ? '5c17a3d963ca649138ec522c' : null;
  // const variables = kioskId ? { kioskId } : {};
  const data = {
    dailySales: [
      {
        amount: 3.1,
        _id: {
          date: '2020-07-02T10:00:00.000Z',
          kiosk: null,
          line: {
            name: 'Pe.We. Wrap',
            _id: '5c17a3d963ca649138ec522c',
          },
          type: 'day',
          week: null,
        },
      },
      {
        amount: 11.2,
        _id: {
          date: '2020-07-02T10:00:00.000Z',
          kiosk: null,
          line: {
            name: 'smt',
            _id: '5d4c2829dd6b51002deb29e9',
          },
          type: 'day',
          week: null,
        },
      },
      {
        amount: 5.1,
        _id: {
          date: '2020-07-02T10:00:00.000Z',
          kiosk: null,
          line: {
            name: 'Supernature Snack',
            _id: '5c17a3d963ca649138ec522c',
          },
          type: 'day',
          week: null,
        },
      },
      {
        amount: 14.2,
        _id: {
          date: '2020-07-02T22:00:00.000Z',
          kiosk: null,
          line: {
            name: 'Pe.We. Wrap',
            _id: '5d4c2829dd6b51002deb29e9',
          },
          type: 'day',
          week: null,
        },
      },
      {
        amount: 11.1,
        _id: {
          date: '2020-07-01T12:00:00.000Z',
          kiosk: null,
          line: {
            name: 'Pe.We. Baguette',
            _id: '5d4c333de826180031d1feef',
          },
          type: 'day',
          week: null,
        },
      },
      {
        amount: 1.2,
        _id: {
          date: '2020-07-01T04:00:00.000Z',
          kiosk: null,
          line: {
            name: 'Pe.We. Baguette',
            _id: '5d6502affaef88002f76347a',
          },
          type: 'day',
          week: null,
        },

      },
      {
        amount: 7.1,
        _id: {
          date: '2020-07-01T10:30:00.000Z',
          kiosk: null,
          line: {
            name: 'Pe.We. Baguette',
            _id: '5d6502affaef88002f76347a',
          },
          type: 'day',
          week: null,
        },

      },
    ],
    dailySalesByKiosk: [
      {
        amount: 3.2,
        _id: {
          date: '2020-07-02T10:00:00.000Z',
          kiosk: null,
          line: {
            name: 'Pe.We. Wrap',
            _id: '5c17a3d963ca649138ec522c',
          },
          type: 'day',
          week: null,
        },
      },
      {
        amount: 11.1,
        _id: {
          date: '2020-07-02T10:00:00.000Z',
          kiosk: null,
          line: {
            name: 'smt',
            _id: '5c17a3d963ca649138ec522c',
          },
          type: 'day',
          week: null,
        },
      },
      {
        amount: 5.2,
        _id: {
          date: '2020-07-02T10:00:00.000Z',
          kiosk: null,
          line: {
            name: 'Supernature Snack',
            _id: '5c17a3d963ca649138ec522c',
          },
          type: 'day',
          week: null,
        },
      },
      {
        amount: 14.1,
        _id: {
          date: '2020-07-02T22:00:00.000Z',
          kiosk: null,
          line: {
            name: 'Pe.We. Wrap',
            _id: '5c17a3d963ca649138ec522c',
          },
          type: 'day',
          week: null,
        },
      },
      {
        amount: 11.2,
        _id: {
          date: '2020-07-01T12:00:00.000Z',
          kiosk: null,
          line: {
            name: 'Pe.We. Baguette',
            _id: '5c17a3d963ca649138ec522c',
          },
          type: 'day',
          week: null,
        },
      },
      {
        amount: 1.1,
        _id: {
          date: '2020-07-01T04:00:00.000Z',
          kiosk: null,
          line: {
            name: 'Pe.We. Baguette',
            _id: '5c17a3d963ca649138ec522c',
          },
          type: 'day',
          week: null,
        },

      },
      {
        amount: 7.2,
        _id: {
          date: '2020-07-01T10:30:00.000Z',
          kiosk: null,
          line: {
            name: 'Pe.We. Baguette',
            _id: '5c17a3d963ca649138ec522c',
          },
          type: 'day',
          week: null,
        },
      },
    ],
  };

  try {
    // const { data } = yield call(gqlReports.query, {
    //   query: kioskId ? query[time] : queryGlobal[time],
    //   variables,
    // });
    const products = [];
    const queryName = kioskId ? queryKey[time] : queryKeyGlobal[time];
    const selector = '_id.date';
    /* eslint-disable */
    data[queryName].forEach(elem => {
      if (time === 'daily') {
        elem._id.date = elem._id.date.split('T')[1].split(':')[0];
      } else {
        elem._id.date = days[new Date(elem._id.date).getDay()];
      }
    });
    /* eslint-enable */
    const formatted = groupBy(data[queryName], selector);
    const res = Object.keys(formatted).map(key => {
      const obj = formatted[key].reduce((prev, { amount, _id }) => {
        const value = Math.round(amount * 100) / 100;
        const kiosk = (_id.line ? _id.line._id : '') || 'unknown';
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
    const dataArray = formatData(res, time, kioskId);
    yield put(actionSuccess({ statistic: dataArray, products }));
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeEvery(action, handler);
}
