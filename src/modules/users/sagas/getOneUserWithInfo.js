import { call, put, takeEvery } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import { getOneUserWithInfo, setOneUserWithInfo } from '../actions';
import { GET_ONE_USER_WITH_INFO } from '../schema';

function* handler({ payload: { id } }) {
  try {
    const {
      data: { getOneUserWithInfo },
    } = yield call(gqlOrganization.query, {
      query: GET_ONE_USER_WITH_INFO,
      variables: {
        id,
      },
    });
    yield put(
      setOneUserWithInfo({
        user: getOneUserWithInfo,
      }),
    );
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeEvery(getOneUserWithInfo, handler);
}
