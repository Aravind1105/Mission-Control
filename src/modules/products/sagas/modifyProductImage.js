import { call, put, takeLatest } from 'redux-saga/effects';
import gqlProducts from 'lib/https/gqlProducts';
import { UPLOAD_PRODUCT_LINE_IMAGE_MUTATION } from '../schema';
import {
  modifyProductImage as action,
  modifyProductImageSuccess as actionSuccess,
} from '../actions';

function* handler({ payload: { id, image } }) {
  try {
    const {
      data: { updateProductLineImage },
    } = yield call(gqlProducts.mutate, {
      mutation: UPLOAD_PRODUCT_LINE_IMAGE_MUTATION,
      variables: {
        id,
        image,
      },
    });

    yield put(actionSuccess(updateProductLineImage));
  } catch (e) {
    console.log(e);
    window.alert(
      'An error has occurred with your action. Please contact the Livello staff.',
    );
  }
}

export default function* modifyProductImage() {
  yield takeLatest(action, handler);
  return handler;
}
