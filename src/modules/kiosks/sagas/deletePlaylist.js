import { call, put, takeLatest } from 'redux-saga/effects';
import history from 'lib/history';
import gqlKiosk from 'lib/https/gqlKiosk';
import {
  deletePlayList as action,
  deletePlayListSuccess as actionSuccess,
} from '../actions';
import { DELETE_PLAYLIST, UPDATE_PLAYLIST } from '../schema';
import { toast } from 'react-semantic-toasts';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const variables = {
      kioskId: payload.kioskId,
      contentId: payload.id,
    };
    const responseData = yield call(gqlKiosk.mutate, {
      mutation: DELETE_PLAYLIST,
      variables,
    });
    const res = responseData.data.deletePlayListContent;
    if (responseData && !responseData.errors) {
      toast({
        type: 'success',
        description: 'Content Playlist created successfully',
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
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
