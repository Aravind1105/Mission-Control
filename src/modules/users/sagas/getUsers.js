import { call, put, takeEvery } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import { getUsers, getUsersSuccess } from '../actions';
import { GET_USERS_SHORT_INFO_QUERY } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { getAllUsersGrid: response },
      errors,
    } = yield call(gqlOrganization.query, {
      query: GET_USERS_SHORT_INFO_QUERY,
      variables: payload,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        getUsersSuccess({
          list: response.data || [],
          total: response.total,
        }),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeEvery(getUsers, handler);
}
