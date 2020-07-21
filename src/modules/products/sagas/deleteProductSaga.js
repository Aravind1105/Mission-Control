import { call, put, takeLatest } from 'redux-saga/effects';
import gqlProducts from 'lib/https/gqlProducts';
import {
  DELETE_PRODUCT_LINE_MUTATION,
} from '../schema';
import {
  deleteProductSaga as action,
  modifyProductSuccess as actionSuccess,
} from '../actions';

function* handler({ payload}) {
    try {
      const variables = {
      id: payload,
      }

      const {
          data: { deleteProduct }
      } = yield call( gqlProducts.mutate, {
          mutation: DELETE_PRODUCT_LINE_MUTATION,
          variables,
      });
      yield put(actionSuccess(deleteProduct));
    } catch (e) {
    console.log(e);
  }    
}

export default function* deleteProductSaga() {
  yield takeLatest(action, handler);
}