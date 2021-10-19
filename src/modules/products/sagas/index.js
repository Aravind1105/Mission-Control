import { all, fork } from 'redux-saga/effects';

import getProductSaga from './getProduct';
import modifyProductSaga from './modifyProduct';
import getFullProductData from './getFullProductData';
import getProductsListSaga from './getProductsList';
import getProductLinesWithFilter from './getProductLinesWithFilter';
import modifyProductImage from './modifyProductImage';
import deleteProductImage from './deleteProductImage';
import getPriceHistorySaga from './getPriceHistorySaga';
import resetPriceHistory from './resetPriceHistory';
import deleteActivePrice from './deleteActivePrice';
import archiveProduct from './archiveProduct';
import duplicateProduct from './duplicateProduct';
import getManufacturers from './getManufacturers';
import getKiosksWithProduct from './getKiosksWithProduct';

export default function* kiosksSaga() {
  yield all([
    fork(getProductsListSaga),
    fork(getProductLinesWithFilter),
    fork(getProductSaga),
    fork(modifyProductSaga),
    fork(getFullProductData),
    fork(modifyProductImage),
    fork(deleteProductImage),
    fork(getPriceHistorySaga),
    fork(resetPriceHistory),
    fork(deleteActivePrice),
    fork(archiveProduct),
    fork(duplicateProduct),
    fork(getManufacturers),
    fork(getKiosksWithProduct),
  ]);
}
