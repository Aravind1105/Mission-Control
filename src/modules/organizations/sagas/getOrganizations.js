import { call, put, takeLatest } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import { GET_ORGANIZATIONS_LIST_QUERY } from '../schema';
import {
  getOrganizations as action,
  getOrganizationsSuccess as actionSuccess,
} from '../actions';

function* handler() {
  try {
    const { data } = yield call(gqlOrganization.query, {
      query: GET_ORGANIZATIONS_LIST_QUERY,
    });
    yield put(actionSuccess(data.getAllOrganizations));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
