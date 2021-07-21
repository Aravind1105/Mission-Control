import { all, fork } from 'redux-saga/effects';

import getProductSaga from './getProduct';
import modifyProductSaga from './modifyProduct';
import getFullProductData from './getFullProductData';
import getProductsListSaga from './getProductsList';
import getProductLinesWithFilter from './getProductLinesWithFilter';
import deleteProductSaga from './deleteProductSaga';
import modifyProductImage from './modifyProductImage';
import deleteProductImage from './deleteProductImage';
import getPriceHistorySaga from './getPriceHistorySaga';
import resetPriceHistory from './resetPriceHistory';
import deleteActivePrice from './deleteActivePrice';
import archiveProduct from './archiveProduct';

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
    fork(getPriceHistorySaga),
    fork(resetPriceHistory),
    fork(deleteActivePrice),
    fork(archiveProduct),
  ]);
}
