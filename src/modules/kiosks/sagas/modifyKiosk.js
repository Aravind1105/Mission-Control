import { call, put, takeLatest } from 'redux-saga/effects';

// import responseErrorFormatter from 'lib/responseErrorFormatter';
import history from 'lib/history';
import gqlKiosk from 'lib/https/gqlKiosk';
import {
  modifyKiosk as action,
  modifyKioskSuccess as actionSuccess,
} from '../actions';
import { CREATE_KIOSK_MUTATION, UPDATE_KIOSK_MUTATION } from '../schema';

function* handler({ payload: { values, formActions } }) {
  try {
    const { id, ...rest } = values;
    const variables = {
      data: rest,
    };
    if (id) {
      variables.id = id;
    }

    const { data } = yield call(gqlKiosk.mutate, {
      mutation: id ? UPDATE_KIOSK_MUTATION : CREATE_KIOSK_MUTATION,
      variables,
    });
    const responseData = data[id ? 'kioskUpdate' : 'kioskCreate'];

    history.push(`/kiosks/detail/${responseData._id}`);
    yield put(actionSuccess(responseData));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
