import { all, fork } from 'redux-saga/effects';

import getUsersSaga from './getUsers';
import toggleUserRoleSaga from './toggleUserRole';

export default function* saga() {
  yield all([fork(getUsersSaga), fork(toggleUserRoleSaga)]);
}
