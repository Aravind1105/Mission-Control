import { call, put, takeLatest } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import {
  createApiKey as action,
  createApiKeySuccess as actionSuccess,
} from '../actions';
import { CREATE_API_KEY } from '../../organizations/schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({}) {
  try {
    const {
      data: { addApiKey: response },
      errors,
    } = yield call(gqlOrganization.query, {
      query: CREATE_API_KEY,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          _id: response[0]._id,
          secret: response[0].secret,
          explanation: response[0].explanation,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
