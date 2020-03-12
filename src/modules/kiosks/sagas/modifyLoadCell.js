import { call, put, takeLatest } from 'redux-saga/effects';

import ls from 'lib/LocalStorage';
import { updateSingleProduct } from 'modules/products/actions';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import { modifyKioskLoadCell, loadKiosksSaga } from '../actions';

function handlerProductChange(payload, id) {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  return fetch(`/api/v1/kiosks/${id}/configLoadCells`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

function handlerProductPriceChange(body, productId) {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  return fetch(`/api/v1/product-lines/${productId}/createPrice`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  });
}

function* handler({ payload }) {
  const { callback, productId, cellId, kioskId, price } = payload;
  try {
    if (cellId) {
      const productPayload = {
        loadCellConfigs: [
          {
            productLine: productId,
            cellId,
          },
        ],
      };
      const response = yield call(
        handlerProductChange,
        productPayload,
        kioskId,
      );
      const data = yield call([response, response.json]);
      if (data.error) {
        throw Error(data.message.error);
      }
    }
    if (price) {
      const changePriceData = JSON.stringify({
        price,
        default: false,
        validForKiosks: [kioskId],
      });
      const response = yield call(
        handlerProductPriceChange,
        changePriceData,
        productId,
      );
      const data = yield call([response, response.json]);
      if (data.error) {
        throw Error(data.message.error);
      }
      yield put(updateSingleProduct(data));
    }
    yield put(loadKiosksSaga());
    callback();
  } catch (error) {
    console.log(error);
  }
}

export default function* modifyLoadCellSaga() {
  yield takeLatest(modifyKioskLoadCell, handler);
}
