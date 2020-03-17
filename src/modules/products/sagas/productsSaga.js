import { call, put, takeEvery } from 'redux-saga/effects';
import LivelloLS from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  getProductListSuccess,
  getProductListSaga,
  loadFamilyAndTaxSaga,
  updateFamily,
  updateTax,
} from '../actions';

function* loadProducts() {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(fetch, '/api/v1/product-lines', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = yield call([response, response.json]);

  yield put(getProductListSuccess(data));
}

function* loadFamilyAndTax() {
  // const family_data = [];
  // const tax_data = [];
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const family_response = yield call(fetch, '/api/v1/product-families', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const family_data = yield call([family_response, family_response.json]);

  const tax_response = yield call(fetch, '/api/v1/taxes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const tax_data = yield call([tax_response, tax_response.json]);
  yield put(updateFamily(family_data));
  yield put(updateTax(tax_data));
}

export function* handleLoadProducts() {
  yield takeEvery(getProductListSaga, loadProducts);
}

export function* handleLoadFamilyAndTax() {
  yield takeEvery(loadFamilyAndTaxSaga, loadFamilyAndTax);
}
