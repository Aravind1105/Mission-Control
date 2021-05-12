import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import toFlatLoadCellItem from 'lib/toFlatLoadCells';
import { getKiosk, getKioskSuccess } from '../actions';
import { GET_KIOSK_QUERY } from '../schema';

function* handler({ payload }) {
  const variables = {
    id: payload,
  };
  try {
    let kiosk = null;
    if (payload !== 'new') {
      const {
        data: { getKioskWithCapacities },
      } = yield call(gqlKiosk.query, {
        query: GET_KIOSK_QUERY,
        variables,
      });

      kiosk = {
        ...getKioskWithCapacities,
        inventory: {
          loadCells: toFlatLoadCellItem(getKioskWithCapacities.inventory.loadCells),
        },
      };
    }
    yield put(getKioskSuccess(kiosk));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getKiosk, handler);
}
