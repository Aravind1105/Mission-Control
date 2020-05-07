import { call, put, takeEvery } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import { getUsers, getUsersSuccess } from '../actions';
import { GET_USERS_SHORT_INFO_QUERY } from '../schema';

function* handler() {
  try {
    const { data } = yield call(gqlOrganization.query, {
      query: GET_USERS_SHORT_INFO_QUERY,
    });

    yield put(getUsersSuccess(data.getAllUsers));
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeEvery(getUsers, handler);
}
