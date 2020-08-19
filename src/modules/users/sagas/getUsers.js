import { call, put, takeEvery } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import { getUsers, getUsersSuccess } from '../actions';
import { GET_USERS_SHORT_INFO_QUERY } from '../schema';

function* handler({ payload }) {
  try {
    const { data: { getAllUsersGrid: response } } = yield call(gqlOrganization.query, {
      query: GET_USERS_SHORT_INFO_QUERY,
      variables: payload,
    });

    yield put(getUsersSuccess({
      list: response.data || [],
      total: response.total,
    }));
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeEvery(getUsers, handler);
}
