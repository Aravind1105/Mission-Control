import { all, fork } from 'redux-saga/effects';

import getUsersSaga from './getUsers';
import getOneUserWithInfo from './getOneUserWithInfo';
import getUserTransactions from './getUserTransactions';
import toggleUserRoleSaga from './toggleUserRole';
import modifyUserMemberCards from './modifyUserMemberCards';


export default function* saga() {
  yield all([
    fork(getUsersSaga),
    fork(toggleUserRoleSaga),
    fork(getOneUserWithInfo),
    fork(getUserTransactions),
    fork(modifyUserMemberCards),
  ]);
}
