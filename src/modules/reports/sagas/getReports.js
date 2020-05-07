import { put, takeLatest, call } from 'redux-saga/effects';

import { getReports, getReportsSuccess } from '../actions';

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const monthGenerate = (days = 30) =>
  Array.from({ length: days }).map((el, i) => ({
    day: 1 + i,
    amount: getRandomInt(1, 22),
  }));

function* handler() {
  try {
    const salesReport = yield new Promise(res =>
      setTimeout(
        () =>
          res({
            lastMonth: monthGenerate(),
            income: monthGenerate(),
            totalRevenue: monthGenerate(),
            portfolioStatistic: {
              deposit: {
                value: getRandomInt(1000000, 3000000),
                percent: getRandomInt(-100, 100),
              },
              dividends: {
                value: getRandomInt(5000000, 10000000),
                percent: getRandomInt(-100, 100),
              },
              gains: {
                value: getRandomInt(100, 50000),
                percent: getRandomInt(-100, 100),
              },
            },
            targetSales: {
              id: '123-dsf-45gv-fbg',
              name: 'Name 1',
              report: Array.from({ length: 6 }).map((el, i) => ({
                month: month[i],
                Name1: getRandomInt(0, 150),
                Name2: getRandomInt(0, 150),
              })),
            },
            targetStatistics: {
              income: getRandomInt(0, 100),
              expenses: getRandomInt(0, 100),
              spending: getRandomInt(0, 100),
              total: getRandomInt(0, 100),
            },
            sellers: {
              newAccounts: getRandomInt(0, 50),
              failed: getRandomInt(0, 20),
              statistic: Array.from({ length: 20 }).map(() => ({
                value: getRandomInt(0, 100),
              })),
              list: Array.from({ length: 5 }).map((el, i) => ({
                firstName: `Name${i}`,
                lastName: `Surname${i}`,
                avatar:
                  'https://react.semantic-ui.com/images/avatar/large/matthew.png',
                earnings1: getRandomInt(50, 700),
                earnings2: getRandomInt(50, 300),
                increase: !!getRandomInt(0, 1),
              })),
            },
            bestSellingProducts: {
              name: 'Toshiba Laptops',
              price: getRandomInt(500, 1000),
              quantity: getRandomInt(5, 20),
              statistic: Array.from({ length: 20 }).map(() => ({
                value: getRandomInt(0, 100),
              })),
              list: Array.from({ length: 5 }).map((el, i) => ({
                name: `Product ${i}`,
                percent: getRandomInt(0, 100),
                price1: getRandomInt(50, 700),
                price2: getRandomInt(50, 300),
                increase: !!getRandomInt(0, 1),
              })),
            },
          }),
        1000,
      ),
    );
    yield put(getReportsSuccess(salesReport));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getReports, handler);
}
