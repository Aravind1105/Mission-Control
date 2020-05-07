import { handleActions } from 'redux-actions';
import { USER_STATE_UPDATE } from '../actions';

const initialState = {
  auth: false,
  root: false,
};

export const userReducer = handleActions(
  {
    [USER_STATE_UPDATE]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState,
);

export default userReducer;
