import { call, put, takeLatest } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import {
  createApiKey as action,
  createApiKeySuccess as actionSuccess,
} from '../actions';
import { CREATE_API_KEY } from '../../organizations/schema';

function* handler({ }) {
  try {
    const { data: { addApiKey: response } } = yield call(gqlOrganization.query, {
      query: CREATE_API_KEY,
    });
    yield put(actionSuccess({
      id: response[0]._id,
      secret: response[0].secret,
    }));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
