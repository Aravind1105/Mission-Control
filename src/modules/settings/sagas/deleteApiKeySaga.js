import { call, put, takeLatest } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import {
  deleteApiKey as action,
  deleteApiKeySuccess as actionSuccess,
} from '../actions';
import { REMOVE_API_KEY } from '../../organizations/schema';

function* handler({ payload }) {
  try {
    const {
      data: { removeApiKey: response },
    } = yield call(gqlOrganization.query, {
      query: REMOVE_API_KEY,
      variables: { apiKeyId: payload },
    });
    yield put(
      actionSuccess({
        _id: '',
        secret: '',
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
