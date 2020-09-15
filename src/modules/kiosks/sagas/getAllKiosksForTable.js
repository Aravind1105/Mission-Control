import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_ALL_KIOSKS_GRID_QUERY } from '../schema';
import { updateKiosksForTable, getAllKiosksForTable } from '../actions';

function* handler({ payload }) {
  try {
    const {
      data: { getKiosksGrid: response },
    } = yield call(gqlKiosk.query, {
      query: GET_ALL_KIOSKS_GRID_QUERY,
      variables: payload,
    });
    yield put(
      updateKiosksForTable({
        list: response.data || [],
        total: response.total,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getAllKiosksForTable, handler);
}
