import { all, fork } from 'redux-saga/effects';

import getUsersSaga from './getUsers';
import getOneUserWithInfo from './getOneUserWithInfo';
import getUserTransactions from './getUserTransactions';
import toggleUserRoleSaga from './toggleUserRole';
import updateUser from './updateUser';
import validateMemberCard from './validateMemberCard';


export default function* saga() {
  yield all([
    fork(getUsersSaga),
    fork(toggleUserRoleSaga),
    fork(getOneUserWithInfo),
    fork(getUserTransactions),
    fork(updateUser),
    fork(validateMemberCard),
  ]);
}
