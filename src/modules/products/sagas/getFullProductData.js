import { call, all, put, takeLatest } from 'redux-saga/effects';

import { handlerGetProduct } from './getProduct';
import { handlerGetProductFamily } from './getProductFamily';
import handlerGetTaxes from './getTaxes';

import {
  getFullProductData as action,
  getFullProductDataSuccess as actionSuccess,
} from '../actions';

function* handler({ payload }) {
  try {
    const [productData, familyData, taxesData] = yield all([
      payload === 'new' ? null : call(handlerGetProduct, payload),
      call(handlerGetProductFamily),
      call(handlerGetTaxes),
    ]);
    if (
      (productData && productData.status !== 200) ||
      familyData.status !== 200 ||
      taxesData.status !== 200
    ) {
      throw Error('error in saga');
    }
    const product = productData
      ? yield call([productData, productData.json])
      : null;
    const family = yield call([familyData, familyData.json]);
    const taxes = yield call([taxesData, taxesData.json]);
    yield put(actionSuccess({ product, family, taxes }));
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
