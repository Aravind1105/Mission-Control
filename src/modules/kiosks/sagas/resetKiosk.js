import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-semantic-toasts';

import gqlKiosk from 'lib/https/gqlKiosk';
import toFlatLoadCellItem from 'lib/toFlatLoadCells';
import {
  resetKiosk as action,
  resetKioskSuccess as actionSuccess,
} from '../actions';
import { KIOSK_RESET_MUTATION, GET_KIOSK_QUERY } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const variables = {
      id: payload,
    };
    const {
      data: { kioskReset: response },
      errors,
    } = yield call(gqlKiosk.mutate, {
      mutation: KIOSK_RESET_MUTATION,
      variables,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    const {
      data: { getKioskWithCapacities },
    } = yield call(gqlKiosk.query, {
      query: GET_KIOSK_QUERY,
      variables,
    });

    const kiosk = {
      ...getKioskWithCapacities,
      inventory: {
        loadCells: toFlatLoadCellItem(
          getKioskWithCapacities.inventory.loadCells,
        ),
      },
    };
    yield put(actionSuccess(kiosk));
    if (response?._id) {
      toast({
        type: 'success',
        description: 'Session is reset',
        animation: 'fade left',
      });
    } else {
      toast({
        type: 'error',
        description: 'Error! Something went wrong',
        animation: 'fade left',
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
