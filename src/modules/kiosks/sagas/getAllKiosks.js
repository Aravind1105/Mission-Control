import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_ALL_KIOSKS_GRID_QUERY } from '../schema';
import { updateKiosks, getAllKiosks } from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { getKiosksGrid: response },
      errors,
    } = yield call(gqlKiosk.query, {
      query: GET_ALL_KIOSKS_GRID_QUERY,
      variables: payload,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        updateKiosks({
          list: response.data || [],
          total: response.total,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getAllKiosks, handler);
}
