import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';

import gqlKiosk from 'lib/https/gqlKiosk';
import { getKiosk, getKioskSuccess } from '../actions';
import { GET_KIOSK_QUERY } from '../schema';

function* handler({ payload }) {
  const variables = {
    id: payload,
  };
  try {
    let kiosk = null;
    if (payload !== 'new') {
      const {
        data: { getKioskById },
      } = yield call(gqlKiosk.query, {
        query: GET_KIOSK_QUERY,
        variables,
      });

      kiosk = {
        ...getKioskById,
        // TODO: reduce logic of inventory prop after queries can work with pagination and filter
        inventory: {
          loadCells: getKioskById.inventory.loadCells.map(el => ({
            ...el,
            products: el.products.map(({ _id, statusHistory }) => ({
              _id,
              status: get(statusHistory.slice(-1), '0.status', ''),
            })),
            productLine: el.productLine
              ? {
                  _id: el.productLine._id,
                  name: el.productLine.name,
                  price: get(
                    el.productLine.priceHistory
                      .reverse()
                      .find(
                        price =>
                          price.validForKiosks.includes(payload) ||
                          price.default,
                      ),
                    'price',
                    0,
                  ),
                }
              : null,
          })),
        },
      };
    }
    yield put(getKioskSuccess(kiosk));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getKiosk, handler);
}
