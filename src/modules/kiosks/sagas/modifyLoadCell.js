import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import gqlProduct from 'lib/https/gqlProducts';
import { CREATE_PRODUCT_LINE_PRICE_MUTATION } from 'modules/products/schema';
import {
  LOAD_CELL_CONFIG_MUTATION,
  RESET_LOAD_CELL_INVENTORY_MUTATION,
  SET_PLANOGRAM_POSITION_MUTATION,
} from '../schema';
import { modifyKioskLoadCell, getKiosk } from '../actions';

function* handler({ payload }) {
  const {
    callback,
    isPriceChanged,
    isProductChanged,
    isQuantityChanged,
    isPositionIdChanged,
    data,
  } = payload;
  const {
    cellId,
    kioskId,
    price,
    quantity,
    positionId,
    product: { value: productId },
  } = data;
  try {
    if (isProductChanged) {
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

    if (isPositionIdChanged) {
      const variables = {
        kioskId,
        data: {
          cellId,
          positionId,
        },
      };
      yield call(gqlKiosk.mutate, {
        mutation: SET_PLANOGRAM_POSITION_MUTATION,
        variables,
      });
    }

    if (isQuantityChanged) {
      const variables = {
        id: kioskId,
        cellId,
        data: { amount: quantity },
      };
      const a = yield call(gqlKiosk.mutate, {
        mutation: RESET_LOAD_CELL_INVENTORY_MUTATION,
        variables,
      });
      console.log(a);
    }

    if (isPriceChanged) {
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
