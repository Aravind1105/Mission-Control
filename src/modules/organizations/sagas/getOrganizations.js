import { call, put, takeLatest } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import { GET_ORGANIZATIONS_LIST_QUERY } from '../schema';
import {
  getOrganizations as action,
  getOrganizationsSuccess as actionSuccess,
} from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { getOrganizationsGrid: response },
      errors,
    } = yield call(gqlOrganization.query, {
      query: GET_ORGANIZATIONS_LIST_QUERY,
      variables: payload,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          list: response.data || [],
          total: response.total,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
