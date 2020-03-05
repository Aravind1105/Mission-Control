import { call, put, takeEvery, all } from 'redux-saga/effects';
import LivelloLS from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  updateProducts,
  loadProductsSaga,
  PRODUCT_SAGA_ADD,
  FAMILYANDTAX_SAGA_ADD,
  updateFamily,
  updateTax,
  handleSearchTextChange,
} from '../actions';

function* loadProducts() {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(fetch, '/api/v1/product-lines', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = yield call([response, response.json]);

  yield put(updateProducts(data));
}

function* addProducts(action) {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(fetch, '/api/v1/product-lines', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.payload),
  });

  const data = yield call([response, response.json]);
  console.log(data);
  loadProducts();
  // yield put(updateProducts(data));
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
function* handleLoadProducts() {
  yield takeEvery(loadProductsSaga, loadProducts);
}
function* handleAddProducts() {
  yield takeEvery(PRODUCT_SAGA_ADD, addProducts);
}
function* handleLoadFamilyAndTax() {
  yield takeEvery(FAMILYANDTAX_SAGA_ADD, loadFamilyAndTax);
}

export default function* productsSaga() {
  yield all([
    handleLoadProducts(),
    handleAddProducts(),
    handleLoadFamilyAndTax(),
  ]);
}
