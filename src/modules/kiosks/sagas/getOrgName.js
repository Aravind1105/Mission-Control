import { call, put, takeLatest } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import { getOrganizationById as action, getOrganizationByIdSuccess as actionSuccess } from '../actions';
import { GET_ORGANIZATION_BY_ID } from '../../organizations/schema';

function* handler({ payload }) {
  try {
    const {
      data: { getOrganizationById },
    } = yield call(gqlOrganization.query, {
      query: GET_ORGANIZATION_BY_ID,
      variables: {
        id: payload,
      },
    });
    const response = {
      orgName: getOrganizationById.name,
    };
    yield put(actionSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
