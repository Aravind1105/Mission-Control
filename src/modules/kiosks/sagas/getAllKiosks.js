import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_ALL_KIOSKS_GRID_QUERY } from '../schema';
import { updateKiosks, getAllKiosks } from '../actions';

function* handler({ payload }) {
  try {
    const { data: { getKiosksGrid: response } } = yield call(gqlKiosk.query, {
      query: GET_ALL_KIOSKS_GRID_QUERY,
      variables: payload,
    });
    yield put(updateKiosks({
      list: response.data || [],
      total: response.total,
    }));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getAllKiosks, handler);
}
