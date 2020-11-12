import { call, put, takeEvery } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import { toggleUserRole, toggleUserRoleSuccess } from '../actions';
import { USER_ROLE_TOGGLE_MUTATION } from '../schema';
import { toast } from 'react-semantic-toasts';

function* handler({ payload }) {
  const variables = {
    data: payload,
  };
  const response = yield call(gqlOrganization.mutate, {
    mutation: USER_ROLE_TOGGLE_MUTATION,
    variables,
  });
  const responseData = response.data.grantRootForUser;
  if (!response.errors) {
    toast({
      type: 'success',
      description: `${responseData.root ? `Root access successfully granted` : `Root access successfully revoked`}`,
      animation: 'fade left',
    });
  } else {
    toast({
      type: 'error',
      description: 'Error! Root access denied',
      animation: 'fade left'
    });
  }
  yield put(toggleUserRoleSuccess(responseData));
}

export default function* saga() {
  yield takeEvery(toggleUserRole, handler);
}
