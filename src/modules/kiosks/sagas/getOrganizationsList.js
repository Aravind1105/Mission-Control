import { call, put, takeLatest } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import { GET_ORGS_LIST } from '../schema';
import { getOrgsList, getOrgsListSuccess } from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({}) {
  try {
    console.log('qwerty==-=-=-=-=-=');
    const {
      data: { getAllOrganizations },
      errors,
    } = yield call(gqlOrganization.query, {
      query: GET_ORGS_LIST,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else yield put(getOrgsListSuccess(getAllOrganizations));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getOrgsList, handler);
}
