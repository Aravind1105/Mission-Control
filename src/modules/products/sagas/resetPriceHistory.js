import { put, takeLatest } from 'redux-saga/effects';
import {
  resetPriceHistory as action,
  resetPriceHistorySuccess as actionSuccess,
} from '../actions';

function* handler({ }) {
  yield put(actionSuccess());
}

export default function* deleteProductImage() {
  yield takeLatest(action, handler);
  return handler;
}
