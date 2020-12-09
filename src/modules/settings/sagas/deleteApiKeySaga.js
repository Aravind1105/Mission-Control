import { call, put, takeLatest } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import {
  createApiKey as action,
  createApiKeySuccess as actionSuccess,
} from '../actions';
import { REMOVE_API_KEY } from '../../organizations/schema';

function* handler({ payload }) {
  try {
    const { data: { addApiKey: response } } = yield call(gqlOrganization.query, {
      query: REMOVE_API_KEY,
      variables: { apiKeyId: payload.id }
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
