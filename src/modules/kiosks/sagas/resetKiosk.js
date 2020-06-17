import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import toFlatLoadCellItem from 'lib/toFlatLoadCells';
import {
  resetKiosk as action,
  resetKioskSuccess as actionSuccess,
} from '../actions';
import { KIOSK_RESET_MUTATION } from '../schema';

function* handler({ payload }) {
  try {
    const variables = {
      id: payload,
    };
    const {
      data: { kioskReset },
    } = yield call(gqlKiosk.mutate, {
      mutation: KIOSK_RESET_MUTATION,
      variables,
    });
    const kiosk = {
      ...kioskReset,
      inventory: {
        loadCells: toFlatLoadCellItem(kioskReset.inventory.loadCells, payload),
      },
    };

    yield put(actionSuccess(kiosk));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
