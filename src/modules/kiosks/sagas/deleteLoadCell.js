import { call, put, takeLatest } from 'redux-saga/effects';

import toFlatLoadCellItem from 'lib/toFlatLoadCells';
import gqlKiosk from 'lib/https/gqlKiosk';
import {
  deleteLoadCell as action,
  deleteLoadCellSuccess as actionSuccess,
  getKiosk,
} from '../actions';
import { DELETE_LOAD_CELL } from '../schema';

function* handler({ payload }) {
  try {
    const { kioskId, cellId, callback } = payload;
    const {
      data,
    } = yield call(gqlKiosk.mutate, {
      mutation: DELETE_LOAD_CELL,
      variables: { kioskId, cellId },
    });
    // TODO: use this call to update the kiosk information on redux state
    // const kiosk = {
    //   ...deactivateLoadCell,
    //   inventory: {
    //     loadCells: toFlatLoadCellItem(deactivateLoadCell.inventory.loadCells),
    //   },
    // };
    // This is a hotfix, deleteLoadcell resolver should return data with capacities
    yield put(getKiosk(kioskId));
    callback();
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
