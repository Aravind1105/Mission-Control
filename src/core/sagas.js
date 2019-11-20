import { all } from 'redux-saga/effects';

import authenticateSaga from 'modules/authentication/sagas/authenticate';
import organizationsSaga from 'modules/organizations/sagas/organizationsSaga';
import kiosksSaga from 'modules/kiosks/sagas/kiosksSaga';
import usersSaga from 'modules/users/sagas/usersSaga';

import coreSaga from './sagas/core';
import languageSaga from './sagas/i18n';
import productsSaga from '../modules/products/sagas/productsSaga';

// Shared sagas

const sagas = [
  authenticateSaga(),
  coreSaga(),
  languageSaga(),
  organizationsSaga(),
  usersSaga(),
  kiosksSaga(),
  productsSaga()
];

export default function* rootSaga() {
  yield all(sagas);
}
