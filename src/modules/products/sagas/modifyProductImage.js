import { call, put, takeLatest } from 'redux-saga/effects';
import gqlProducts from 'lib/https/gqlProducts';
import { UPLOAD_PRODUCT_LINE_IMAGE_MUTATION } from '../schema';
import {
  modifyProductImage as action,
  modifyProductImageSuccess as actionSuccess,
} from '../actions';
import { toast } from 'react-semantic-toasts';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload: { id, image } }) {
  try {
    const {
      data: { updateProductLineImage },
      errors,
    } = yield call(gqlProducts.mutate, {
      mutation: UPLOAD_PRODUCT_LINE_IMAGE_MUTATION,
      variables: {
        id,
        image,
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(actionSuccess(updateProductLineImage));
      toast({
        type: 'success',
        description: 'Product Image updated successfully.',
        animation: 'fade left',
      });
    }
  } catch (e) {
    console.log(e);
    toast({
      type: 'error',
      description: 'Error updating product image.',
      animation: 'fade left',
    });
  }
}

export default function* modifyProductImage() {
  yield takeLatest(action, handler);
  return handler;
}
