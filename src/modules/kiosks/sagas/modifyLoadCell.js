import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import gqlProduct from 'lib/https/gqlProducts';
import { CREATE_PRODUCT_LINE_PRICE_MUTATION } from 'modules/products/schema';
import { LOAD_CELL_CONFIG_MUTATION } from '../schema';
import { modifyKioskLoadCell, getKiosk } from '../actions';

function* handler({ payload }) {
  const { callback, productId, cellId, kioskId, price } = payload;
  try {
    if (cellId) {
      const variables = {
        data: {
          kioskId,
          loadCellConfigs: [
            {
              productLine: productId,
              cellId,
            },
          ],
        },
      };

      yield call(gqlKiosk.mutate, {
        mutation: LOAD_CELL_CONFIG_MUTATION,
        variables,
      });
    }
    if (price) {
      const variables = {
        id: productId,
        data: {
          price: Number(price),
          default: false,
          validForKiosks: [kioskId],
        },
      };
      yield call(gqlProduct.mutate, {
        mutation: CREATE_PRODUCT_LINE_PRICE_MUTATION,
        variables,
      });
    }
    yield put(getKiosk(kioskId));
    callback();
  } catch (error) {
    console.log(error);
  }
}

export default function* modifyLoadCellSaga() {
  yield takeLatest(modifyKioskLoadCell, handler);
}
