import { handleActions } from 'redux-actions';
import { CORE_STATE_SET_INIT } from '../actions/coreActions';

const initialState = {
  initialized: false,
};

export const coreReducer = handleActions(
  {
    [CORE_STATE_SET_INIT]: (state, { payload }) => ({
      ...state,
      initialized: payload,
    }),
  },
  initialState,
);

export default coreReducer;
