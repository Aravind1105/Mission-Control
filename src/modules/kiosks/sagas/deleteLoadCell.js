import { call, put, takeLatest } from 'redux-saga/effects';

import toFlatLoadCellItem from 'lib/toFlatLoadCells';
import gqlKiosk from 'lib/https/gqlKiosk';
import {
  deleteLoadCell as action,
  deleteLoadCellSuccess as actionSuccess,
  getKiosk,
} from '../actions';
import { DELETE_LOAD_CELL } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const { kioskId, cellId, callback } = payload;
    const {
      data: { deleteLoadCell },
      errors,
    } = yield call(gqlKiosk.mutate, {
      mutation: DELETE_LOAD_CELL,
      variables: { kioskId, cellId },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      const kiosk = {
        ...deleteLoadCell,
        inventory: {
          loadCells: toFlatLoadCellItem(deleteLoadCell.inventory.loadCells),
        },
      };
      yield put(actionSuccess(kiosk));
      callback();
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
