import { call, put, takeLatest } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import {
  getOrganizationById as action,
  getOrganizationByIdSuccess as actionSuccess,
} from '../actions';
import { GET_ORGANIZATION_BY_ID } from '../../organizations/schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { getOrganizationById },
      errors,
    } = yield call(gqlOrganization.query, {
      query: GET_ORGANIZATION_BY_ID,
      variables: {
        id: payload,
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      const response = {
        org: getOrganizationById,
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
