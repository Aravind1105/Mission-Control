import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import toFlatLoadCellItem from 'lib/toFlatLoadCells';
import {
  resetKiosk as action,
  resetKioskSuccess as actionSuccess,
} from '../actions';
import { KIOSK_RESET_MUTATION, GET_KIOSK_QUERY } from '../schema';

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
    // TODO: fix null name and img from resetKiosk endpoint. This is a workaround to solve LIV-1310.
    const {
      data: { getKioskWithCapacities },
    } = yield call(
      gqlKiosk.query, {
      query: GET_KIOSK_QUERY,
      variables,
    });
    const kiosk = {
      // ...kioskReset,
      ...getKioskWithCapacities,
      inventory: {
        // loadCells: toFlatLoadCellItem(kioskReset.inventory.loadCells, payload),
        loadCells: toFlatLoadCellItem(getKioskWithCapacities.inventory.loadCells, payload),
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
