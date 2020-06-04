import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';

import gqlKiosk from 'lib/https/gqlKiosk';
import { getKiosk, getKioskSuccess } from '../actions';
import { GET_KIOSK_QUERY } from '../schema';

const getPrice = (priceArr, kioskId) => {
  const priceForKiosk = priceArr
    .reverse()
    .find(price => price.validForKiosks.includes(kioskId) || price.default);
  return priceForKiosk ? priceForKiosk.price : 0;
};

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
            productLine: el.productLine
              ? {
                  _id: el.productLine._id,
                  name: el.productLine.name,
                  image: get(el, 'productLine.images.0', ''),
                  price: getPrice(el.productLine.priceHistory, payload),
                }
              : {},
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
