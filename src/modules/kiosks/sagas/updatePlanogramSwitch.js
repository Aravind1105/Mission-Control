import { takeLatest, put } from 'redux-saga/effects';
import {
  setPlanogramSwitchState as action,
  setPlanogramSwitchStateSuccess as actionSuccess,
} from '../actions';

function* handler({ payload: { setSide } }) {
  yield put(actionSuccess({ setSide }));
}

export default function* saga() {
  yield takeLatest(action, handler);
}
