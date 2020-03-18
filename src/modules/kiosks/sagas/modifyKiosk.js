import { call, put, takeLatest } from 'redux-saga/effects';

import ls from 'lib/LocalStorage';
import responseErrorFormatter from 'lib/responseErrorFormatter';
import history from 'lib/history';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  modifyKiosk as action,
  modifyKioskSuccess as actionSuccess,
} from '../actions';

function handlerRequest(id, body) {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  const route = id ? `/${id}` : '';

  return fetch(`/api/v1/kiosks${route}`, {
    method: id ? 'PATCH' : 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  });
}

function* handler({ payload: { values, formActions } }) {
  try {
    const { id, ...rest } = values;
    const body = JSON.stringify(rest);
    const response = yield call(handlerRequest, id, body);
    const data = yield call([response, response.json]);

    if (!data._id) {
      const errors = responseErrorFormatter(data);
      if (errors) yield put(formActions.setErrors(errors));
      throw Error('error in saga');
    }
    history.push(`/kiosks/edit/${data._id}`);
    yield put(actionSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
