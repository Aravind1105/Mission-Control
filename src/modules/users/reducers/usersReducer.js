import { handleActions } from 'redux-actions';
import { findIndex, propEq, update } from 'ramda';
import {
  USERS_STATE_UPDATE,
  USERS_STATE_UPDATE_BY_ID,
} from '../actions/usersActions';

const initialState = [];

export const usersReducer = handleActions(
  {
    [USERS_STATE_UPDATE]: (state, { payload }) => payload,
    [USERS_STATE_UPDATE_BY_ID]: (state, { payload }) => {
      const index = findIndex(propEq('_id', payload._id))(state);
      return update(index, { ...state[index], ...payload }, state);
    },
  },
  initialState,
);

export default usersReducer;
