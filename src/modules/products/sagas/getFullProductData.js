import { call, put, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  GET_PRODUCT_BY_ID_QUERY,
  GET_ASSETS_FOR_NEW_PRODUCT_QUERY,
} from '../schema';

// import { handlerGetProduct } from './getProduct';
// import handlerGetTaxes from './getTaxes';

import {
  getFullProductData as action,
  getFullProductDataSuccess as actionSuccess,
} from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  const isEdit = payload !== 'new';
  const query = {
    query: isEdit ? GET_PRODUCT_BY_ID_QUERY : GET_ASSETS_FOR_NEW_PRODUCT_QUERY,
    fetchPolicy: 'no-cache',
  };
  if (isEdit) {
    query.variables = {
      id: payload,
    };
  }
  try {
    const {
      data: {
        getProductLineById = null,
        getProductFamilies = [],
        taxFindAll = [],
      },
      errors,
    } = yield call(gqlProducts.query, query);
    const response = {
      product: getProductLineById,
      family: getProductFamilies,
      taxes: taxFindAll,
    };
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else yield put(actionSuccess(response));
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
