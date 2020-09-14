import { call, put, takeLatest } from 'redux-saga/effects';
import gqlProducts from 'lib/https/gqlProducts';
import {
    DELETE_PRODUCT_LINE_IMAGE_MUTATION,
} from '../schema';
import {
    deleteProductImage as action,
    deleteProductImageSuccess as actionSuccess,
} from '../actions';

function* handler({payload: { id, orgId }}) {
  try {
    const {
        data: { deleteProductLineImage },
    } = yield call(gqlProducts.mutate,{
        mutation: DELETE_PRODUCT_LINE_IMAGE_MUTATION,
        variables:{
            id,
            orgId,
        }
      })
    
    yield put(actionSuccess(deleteProductLineImage));
  } catch (e) {
    console.log(e);
    window.alert('An error has occurred with your action. Please contact the Livello staff.');
  }
}

export default function* deleteProductImage() {
  yield takeLatest(action, handler);
  return handler;
}
