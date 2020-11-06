import { call, put, takeEvery } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import { toggleUserRole, toggleUserRoleSuccess } from '../actions';
import { USER_ROLE_TOGGLE_MUTATION } from '../schema';

function* handler({ payload }) {
  const variables = {
    data: payload,
  };
  const { data } = yield call(gqlOrganization.mutate, {
    mutation: USER_ROLE_TOGGLE_MUTATION,
    variables,
  });
  yield put(toggleUserRoleSuccess(data.grantRootForUser));
}

export default function* saga() {
  yield takeEvery(toggleUserRole, handler);
}
