import { call, put, takeLatest } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
// !LIV-1586 On progress
// import gqlKiosk from 'lib/https/gqlKiosk';
import { 
  createRefill as action,
  createRefillSuccess as actionSuccess,
} from '../actions';
// import {
//   resetKioskSuccess as actionSuccess
// } from '../../kiosks/actions';
// import { GET_KIOSK_QUERY } from '../../kiosks/schema';
import { CREATE_REFILL_MUTATION } from '../schema';

function* handler({ payload }) {
  try {
    let variables = {
      kioskId: payload,
    };
    yield call(gqlTransactions.mutate, {
      mutation: CREATE_REFILL_MUTATION,
      variables,
    });
    // variables = {
    //   id: payload,
    // }
    // const {
    //   data: { getKioskById },
    // } = yield call(
    //   gqlKiosk.query, {
    //   query: GET_KIOSK_QUERY,
    //   variables,
    // });
    // const kiosk = {
    //   ...getKioskById,
    // }
    // yield put(actionSuccess(kiosk));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
