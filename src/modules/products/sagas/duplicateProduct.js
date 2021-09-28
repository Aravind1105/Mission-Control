import { call, put, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import { duplicateProductLine as action } from '../actions';
import { DUPLICATE_PRODCUTLINE } from '../schema';
import { toast } from 'react-semantic-toasts';
import history from 'lib/history';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { duplicateProductLine },
      errors,
    } = yield call(gqlProducts.mutate, {
      mutation: DUPLICATE_PRODCUTLINE,
      variables: {
        productLineId: payload.productLineId,
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      toast({
        type: 'success',
        description: 'Product duplicated successfully.',
        animation: 'fade left',
      });
      history.push(`/products/${duplicateProductLine._id}`);
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
    toast({
      type: 'error',
      description: 'Error duplicating product.',
      animation: 'fade left',
    });
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
