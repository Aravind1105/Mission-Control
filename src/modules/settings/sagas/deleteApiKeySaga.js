import { call, put, takeLatest } from 'redux-saga/effects';

import gqlOrganization from 'lib/https/gqlOrganization';
import {
  deleteApiKey as action,
  deleteApiKeySuccess as actionSuccess,
} from '../actions';
import { REMOVE_API_KEY } from '../../organizations/schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { removeApiKey: response },
      errors,
    } = yield call(gqlOrganization.query, {
      query: REMOVE_API_KEY,
      variables: { apiKeyId: payload },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          _id: '',
          secret: '',
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
