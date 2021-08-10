import { call, put, takeLatest } from 'redux-saga/effects';
import history from 'lib/history';
import gqlKiosk from 'lib/https/gqlKiosk';
import {
  updatePlayList as action,
  updatePlayListSuccess as actionSuccess,
} from '../actions';
import { UPDATE_PLAYLIST } from '../schema';
import { toast } from 'react-semantic-toasts';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload: { kioskId, data } }) {
  try {
    const variables = {
      kioskId,
      data,
    };
    const responseData = yield call(gqlKiosk.mutate, {
      mutation: UPDATE_PLAYLIST,
      variables,
    });
    const res = responseData.data.updatePlayList;
    if (responseData && !responseData.errors) {
      toast({
        type: 'success',
        description: 'Playlist saved successfully',
        animation: 'fade left',
      });
    } else if (
      responseData.errors &&
      responseData.errors[0].message === 'Token expired'
    )
      yield put(updateSessionExpired(true));
    else {
      toast({
        type: 'error',
        description: 'Error! Something went wrong',
        animation: 'fade left',
      });
    }
    yield put(actionSuccess(res));
    history.push(`/kiosks/detail/${kioskId}`);
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
