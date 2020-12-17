import { takeLatest,put} from 'redux-saga/effects';
import {setPlanogramSwitchState as action} from '../actions';

function* handler({ payload: {setSide} }) {
    yield put({ type:'setPlanogramSwitchState',value:setSide});
}

export default function* saga() {
  yield takeLatest(action, handler);
}
 

