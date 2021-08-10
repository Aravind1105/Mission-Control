import { all, call, put, takeEvery } from 'redux-saga/effects';
import gqlOrganization from 'lib/https/gqlOrganization';
import { validateMemberCard } from '../actions';
import { VALIDATE_MEMBER_CARD } from '../schema';
import { toast } from 'react-semantic-toasts';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  const { userId, membercards } = payload;
  try {
    const response = yield call(gqlOrganization.query, {
      query: VALIDATE_MEMBER_CARD,
      variables: { userId, data: { membercards } },
    });
    if (response.errors) {
      if (response.errors[0].message === 'Token expired')
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
  yield takeEvery(validateMemberCard, handler);
}
