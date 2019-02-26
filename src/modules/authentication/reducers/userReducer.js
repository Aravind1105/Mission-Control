import { handleActions } from 'redux-actions';
import { USER_STATE_UPDATE } from '../actions/userActions';

const initialState = {
  auth: false,
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
