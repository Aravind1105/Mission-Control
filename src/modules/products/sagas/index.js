import { all, fork } from 'redux-saga/effects';

import getProductSaga from './getProduct';
import getProductFamilySaga from './getProductFamily';
import modifyProductSaga from './modifyProduct';
import getFullProductData from './getFullProductData';
import { handleLoadProducts, handleLoadFamilyAndTax } from './productsSaga';

export default function* kiosksSaga() {
  yield all([
    fork(handleLoadProducts),
    fork(handleLoadFamilyAndTax),
    fork(getProductSaga),
    fork(getProductFamilySaga),
    fork(modifyProductSaga),
    fork(getFullProductData),
  ]);
}
