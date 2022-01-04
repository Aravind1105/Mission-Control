import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-semantic-toasts';

import gqlTransactions from 'lib/https/gqlTransactions';
import gqlKiosk from 'lib/https/gqlKiosk';
import toFlatLoadCellItem from 'lib/toFlatLoadCells';
import {
  createRefill as action,
  createRefillSuccess as actionSuccess,
} from '../actions';
import { GET_KIOSK_QUERY } from '../../kiosks/schema';
import { CREATE_REFILL_MUTATION } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    let variables = {
      kioskId: payload,
    };
    const {
      data: { createRefill: response },
      errors,
    } = yield call(gqlTransactions.mutate, {
      mutation: CREATE_REFILL_MUTATION,
      variables,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    variables = {
      id: payload,
    };

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
        description: 'Opening the door',
        animation: 'fade left',
        icon: 'info',
        color: 'blue',
      });
    } else if (errors[0].message === 'Kiosk already in use.') {
      toast({
        type: 'error',
        description: 'Kiosk is currently in use',
        animation: 'fade left',
        icon: 'info',
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
