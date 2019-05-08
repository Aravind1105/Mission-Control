import { handleActions } from 'redux-actions';
import { USERS_STATE_UPDATE } from '../actions/usersActions';

const initialState = [];

export const usersReducer = handleActions(
  {
    [USERS_STATE_UPDATE]: (state, { payload }) => payload,
  },
  initialState,
);

export default usersReducer;
