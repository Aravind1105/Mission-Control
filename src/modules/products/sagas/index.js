import { all, fork } from 'redux-saga/effects';

import getProductSaga from './getProduct';
import modifyProductSaga from './modifyProduct';
import getFullProductData from './getFullProductData';
import getProductsListSaga from './getProductsList';
import getProductLinesWithFilter from './getProductLinesWithFilter';
import deleteProductSaga from './deleteProductSaga';
import modifyProductImage from './modifyProductImage';
import deleteProductImage from './deleteProductImage';
import getDefaultProductLinePriceHistory from './getDefaultProductLinePriceHistory';
import getProductLineActivePriceHistory from './getProductLineActivePriceHistory';

export default function* kiosksSaga() {
  yield all([
    fork(getProductsListSaga),
    fork(getProductLinesWithFilter),
    fork(getProductSaga),
    fork(modifyProductSaga),
    fork(getFullProductData),
    fork(deleteProductSaga),
    fork(modifyProductImage),
    fork(deleteProductImage),
    fork(getDefaultProductLinePriceHistory),
    fork(getProductLineActivePriceHistory),
  ]);
}
