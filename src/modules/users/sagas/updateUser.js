import { all, call, put, takeEvery } from 'redux-saga/effects';
import gqlOrganization from 'lib/https/gqlOrganization';
import { updateUser, setOneUserWithInfo } from '../actions';
import { UPDATE_USER } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';
import history from 'lib/history';
import { toast } from 'react-semantic-toasts';

function* handler({ payload }) {
  const { id, ...data } = payload;
  try {
    const response = yield call(gqlOrganization.mutate, {
      mutation: UPDATE_USER,
      variables: { id, data },
    });
    const responseData = response.data['updateUser'];
    if (!response.errors) {
      toast({
        description: 'User updated successfully',
        animation: 'fade left',
        icon: 'info',
        color: 'green',
      });
      yield put(
        setOneUserWithInfo({
          user: responseData,
        }),
      );
      history.push('/users');
    } else {
      if (response.errors && response.errors[0].message === 'Token expired')
        yield put(updateSessionExpired(true));
      toast({
        description: response.errors[0].message,
        animation: 'fade left',
        icon: 'info',
        color: 'red',
        time: 5000,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeEvery(updateUser, handler);
}
