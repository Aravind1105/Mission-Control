import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-semantic-toasts';

import gqlKiosk from 'lib/https/gqlKiosk';
import gqlProduct from 'lib/https/gqlProducts';
import { CREATE_PRODUCT_LINE_PRICE_MUTATION } from 'modules/products/schema';
import {
  LOAD_CELL_CONFIG_MUTATION,
  RESET_LOAD_CELL_INVENTORY_MUTATION,
} from '../schema';
import { modifyKioskLoadCell, getKiosk } from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  const {
    callback,
    isPriceChanged,
    isProductChanged,
    isQuantityChanged,
    isPositionIdChanged,
    isCellIdChanged,
    isShelfSizeChanged,
    data,
    oldData,
  } = payload;
  const {
    cellId,
    kioskId,
    price,
    quantity,
    planogramPosition,
    surfaceSize,
    product: { value: productId },
  } = data;
  try {
    if (
      isProductChanged ||
      isPositionIdChanged ||
      isCellIdChanged ||
      isShelfSizeChanged
    ) {
      const variables = {
        data: {
          kioskId,
          loadCellConfigs: [
            {
              productLine: productId,
              planogramPosition,
              cellId,
              surfaceSize: `N${surfaceSize}`,
            },
          ],
        },
      };
      if (oldData) {
        if (isCellIdChanged) {
          variables.data.loadCellConfigs.push({
            productLine: oldData.productLine._id,
            planogramPosition: oldData.planogramPosition[0],
            cellId: oldData.cellId,
            surfaceSize: `N${oldData.surfaceSize}`,
          });
        } else if (isPositionIdChanged) {
          variables.data.loadCellConfigs[1] = {
            productLine: oldData.productLine._id,
            planogramPosition: oldData.planogramPosition,
            cellId: oldData.cellId,
            surfaceSize: `N${oldData.surfaceSize}`,
          };
        }
      }

      const { data, errors } = yield call(gqlKiosk.mutate, {
        mutation: LOAD_CELL_CONFIG_MUTATION,
        variables,
      });
      if (errors && errors[0].message === 'Token expired')
        yield put(updateSessionExpired(true));
    }

    if (isQuantityChanged) {
      const variables = {
        id: kioskId,
        cellId,
        data: { amount: parseInt(quantity, 10) },
      };
      const { data, errors } = yield call(gqlKiosk.mutate, {
        mutation: RESET_LOAD_CELL_INVENTORY_MUTATION,
        variables,
      });
      if (errors && errors[0].message === 'Token expired')
        yield put(updateSessionExpired(true));
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
      const { data, errors } = yield call(gqlProduct.mutate, {
        mutation: CREATE_PRODUCT_LINE_PRICE_MUTATION,
        variables,
      });
      if (errors && errors[0].message === 'Token expired')
        yield put(updateSessionExpired(true));
    }

    yield put(getKiosk(kioskId));
    toast({
      type: 'success',
      description: 'Scale was saved successfully.',
      animation: 'fade left',
    });
    callback();
  } catch (error) {
    console.log(error);
  }
}

export default function* modifyLoadCellSaga() {
  yield takeLatest(modifyKioskLoadCell, handler);
}
