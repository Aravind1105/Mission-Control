import { all, call, takeEvery } from 'redux-saga/effects';
import gqlOrganization from 'lib/https/gqlOrganization';
import { modifyUserMemberCard as action } from '../actions';
import {
  ADD_MEMBER_CARD_ID_FOR_USER_MUTATION,
  DELETE_MEMBER_CARD_ID_FOR_USER_MUTATION,
} from '../schema';

function* handler({ payload: { dataForMutation } }) {
  const { cardsToAdd, cardsToDel } = dataForMutation;
  const callAddArray = cardsToAdd.map(item => {
    return call(gqlOrganization.mutate, {
      mutation: ADD_MEMBER_CARD_ID_FOR_USER_MUTATION,
      variables: { data: item },
    });
  });
  const callDelArray = cardsToDel.map(item => {
    return call(gqlOrganization.mutate, {
      mutation: DELETE_MEMBER_CARD_ID_FOR_USER_MUTATION,
      variables: { data: item },
    });
  });
  try {
    yield all(callAddArray);
    yield all(callDelArray);
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeEvery(action, handler);
}
