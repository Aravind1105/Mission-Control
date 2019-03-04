import { handleActions } from 'redux-actions';
import {
  CORE_STATE_SET_INIT,
  CORE_STATE_SET_LANGUAGE,
} from '../actions/coreActions';

const initialState = {
  initialized: false,
  language: 'en',
};

export const coreReducer = handleActions(
  {
    [CORE_STATE_SET_INIT]: (state, { payload }) => ({
      ...state,
      initialized: payload,
    }),
    [CORE_STATE_SET_LANGUAGE]: (state, { payload }) => ({
      ...state,
      language: payload,
    }),
  },
  initialState,
);

export default coreReducer;
