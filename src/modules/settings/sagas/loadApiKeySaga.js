import { call, put, takeLatest } from 'redux-saga/effects';

import {
  loadApiKey as action,
  loadApiKeySuccess as actionSuccess,
} from '../actions';

function* handler({ payload }) {
  console.log(payload);
  try {
    yield put(
      actionSuccess({
        _id: payload._id,
        secret: payload.secret,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
