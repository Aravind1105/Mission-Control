import { call, put, takeLatest } from 'redux-saga/effects';
import gqlProducts from 'lib/https/gqlProducts';
import { DELETE_PRODUCT_LINE_IMAGE_MUTATION } from '../schema';
import {
  deleteProductImage as action,
  deleteProductImageSuccess as actionSuccess,
} from '../actions';
import { toast } from 'react-semantic-toasts';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload: { id, orgId } }) {
  try {
    const {
      data: { deleteProductLineImage },
      errors,
    } = yield call(gqlProducts.mutate, {
      mutation: DELETE_PRODUCT_LINE_IMAGE_MUTATION,
      variables: {
        id,
        orgId,
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(actionSuccess(deleteProductLineImage));
      toast({
        type: 'success',
        description: 'Product Image deleted successfully.',
        animation: 'fade left',
      });
    }
  } catch (e) {
    console.log(e);
    toast({
      type: 'error',
      description: 'Error deleting product image.',
      animation: 'fade left',
    });
  }
}

export default function* deleteProductImage() {
  yield takeLatest(action, handler);
  return handler;
}
