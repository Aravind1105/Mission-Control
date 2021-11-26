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
import { refillMode } from '../selectors';
import { toast } from 'react-semantic-toasts';

function* handler({ payload }) {
  try {
    const { kioskId, cellId, callback } = payload;
    const {
      data: { deleteLoadCell },
      errors,
    } = yield call(gqlKiosk.mutate, {
      mutation: DELETE_LOAD_CELL,
      variables: { kioskId, cellId, added: refillMode.MISSION_CONTROL },
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
      toast({
        type: 'success',
        description: 'Scale was deleted successfully.',
        animation: 'fade left',
      });
      callback();
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
