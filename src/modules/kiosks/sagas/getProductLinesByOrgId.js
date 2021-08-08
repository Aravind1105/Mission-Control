import { call, put, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  getProductLinesByOrgId as action,
  getProductLinesByOrgIdSuccess as actionSuccess,
} from '../actions';
import { GET_PRODUCT_LINES_BY_ORG_ID } from '../../products/schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { getProductLinesByOrgId },
      errors,
    } = yield call(gqlProducts.query, {
      query: GET_PRODUCT_LINES_BY_ORG_ID,
      variables: { orgId: payload },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      const response = {
        productsByOrgId: getProductLinesByOrgId,
      };
      yield put(actionSuccess(response));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
