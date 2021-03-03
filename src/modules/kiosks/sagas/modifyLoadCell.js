import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import gqlProduct from 'lib/https/gqlProducts';
import { CREATE_PRODUCT_LINE_PRICE_MUTATION } from 'modules/products/schema';
import {
  LOAD_CELL_CONFIG_MUTATION,
  RESET_LOAD_CELL_INVENTORY_MUTATION,
} from '../schema';
import { modifyKioskLoadCell, getKiosk } from '../actions';

function* handler({ payload }) {
  const {
    callback,
    isPriceChanged,
    isProductChanged,
    isQuantityChanged,
    isPositionIdChanged,
    isCellIdChanged,
    data,
    oldData,
  } = payload;
  const {
    cellId,
    kioskId,
    price,
    quantity,
    planogramPosition,
    product: { value: productId },
  } = data;
  try {
    if (isProductChanged || isPositionIdChanged || isCellIdChanged) {
      const variables = {
        data: {
          kioskId,
          loadCellConfigs: [
            {
              productLine: productId,
              planogramPosition,
              cellId,
              isActive: true,
            },
          ],
        },
      };
      if (oldData) {
        variables.data.loadCellConfigs.push({
          productLine: oldData.productLine._id,
          planogramPosition: oldData.planogramPosition[0],
          cellId: oldData.cellId,
          isActive: false,
        });
      }

      yield call(gqlKiosk.mutate, {
        mutation: LOAD_CELL_CONFIG_MUTATION,
        variables,
      });
    }

    if (isQuantityChanged) {
      const variables = {
        id: kioskId,
        cellId,
        data: { amount: parseInt(quantity, 10) },
      };
      yield call(gqlKiosk.mutate, {
        mutation: RESET_LOAD_CELL_INVENTORY_MUTATION,
        variables,
      });
    }

    if (isPriceChanged) {
      const variables = {
        id: productId,
        data: {
          price: Number(price),
          default: false,
          validForKiosk: kioskId,
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
