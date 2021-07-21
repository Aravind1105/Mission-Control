import { call, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import { archiveProduct as action } from '../actions';
import { ARCHIVE_PRODUCTLINE } from '../schema';
import { toast } from 'react-semantic-toasts';

function* handler({ payload }) {
  try {
    const {
      data: { archiveProductLine },
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
    } else {
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
