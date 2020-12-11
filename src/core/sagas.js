import { all, fork } from 'redux-saga/effects';

import authenticateSaga from 'modules/authentication/sagas/authenticate';
import organizationsSaga from 'modules/organizations/sagas';
import kiosksSaga from 'modules/kiosks/sagas';
import usersSaga from 'modules/users/sagas';
import transactionsSaga from 'modules/transactions/sagas';
import reportsSaga from 'modules/reports/sagas';
import dashboardSaga from 'modules/dashboard/sagas';

import coreSaga from './sagas/core';
import languageSaga from './sagas/i18n';
import productsSaga from '../modules/products/sagas';
import settingsSaga from '../modules/settings/sagas';

export default function* rootSaga() {
  yield all([
    fork(authenticateSaga),
    fork(coreSaga),
    fork(languageSaga),
    fork(organizationsSaga),
    fork(usersSaga),
    fork(kiosksSaga),
    fork(productsSaga),
    fork(transactionsSaga),
    fork(reportsSaga),
    fork(dashboardSaga),
    fork(settingsSaga),
  ]);
}
