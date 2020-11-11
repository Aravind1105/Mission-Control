import { all, call, takeEvery } from 'redux-saga/effects';
import gqlOrganization from 'lib/https/gqlOrganization';
import { updateUser as action, setOneUserWithInfo } from '../actions';
import {
  UPDATE_USER
} from '../schema';
import history from 'lib/history';
import { toast } from 'react-semantic-toasts';

function* handler({ payload }) {
  const { id, ...data } = payload;
  try {
    const response  = yield call(gqlOrganization.mutate, {
      mutation: UPDATE_USER,
      variables: { id, data },
    });
    const responseData = response.data['updateUser'];
    if(!response.error) {
      toast({description:'User updated successfully', animation:'fade left', icon:'info', color: 'green'});
    } else {
      toast({description:'Error updating user', animation:'fade left', icon:'info', color: 'red'});
    }
    history.push('/users');
    yield put(setOneUserWithInfo({
      user: responseData,
    }));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeEvery(action, handler);
}
