import { call, put, takeLatest } from 'redux-saga/effects';

import toFlatLoadCellItem from 'lib/toFlatLoadCells';
import gqlKiosk from 'lib/https/gqlKiosk';
import {
  deleteLoadCell as action,
  deleteLoadCellSuccess as actionSuccess,
} from '../actions';
import { DELETE_LOAD_CELL } from '../schema';

function* handler({ payload }) {
  try {
    const { kioskId, cellId, callback } = payload;
    const {
      data: { deleteLoadCell },
    } = yield call(gqlKiosk.mutate, {
      mutation: DELETE_LOAD_CELL,
      variables: { kioskId, cellId },
    });
    const kiosk = {
      ...deleteLoadCell,
      inventory: {
        loadCells: toFlatLoadCellItem(deleteLoadCell.inventory.loadCells),
      },
    };
    yield put(actionSuccess(kiosk));
    callback();
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
