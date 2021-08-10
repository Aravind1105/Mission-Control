import { call, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import { archiveProduct as action } from '../actions';
import { ARCHIVE_PRODUCTLINE } from '../schema';
import { toast } from 'react-semantic-toasts';
import history from 'lib/history';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { archiveProductLine },
      errors,
    } = yield call(gqlProducts.mutate, {
      mutation: ARCHIVE_PRODUCTLINE,
      variables: {
        productLineId: payload.productLineId,
      },
    });
    if (archiveProductLine) {
      toast({
        type: 'success',
        description: 'Product deleted successfully.',
        animation: 'fade left',
      });
      history.push(`/products`);
    } else if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      toast({
        type: 'error',
        description:
          'Cannot delete product. Product added to one or more kiosks.',
        animation: 'fade left',
        time: 5000,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
