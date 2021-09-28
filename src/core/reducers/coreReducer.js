import { handleActions } from 'redux-actions';
import {
  setAppInitialized,
  setLanguageState,
  updateSessionExpired,
} from '../actions/coreActions';

const initialState = {
  initialized: false,
  language: 'en',
  isExpired: false,
};

export const coreReducer = handleActions(
  {
    [setAppInitialized]: (state, { payload }) => ({
      ...state,
      initialized: payload,
    }),
    [setLanguageState]: (state, { payload }) => ({
      ...state,
      language: payload,
    }),
    [updateSessionExpired]: (state, { payload }) => ({
      ...state,
      isExpired: payload,
    }),
  },
  initialState,
);

export default coreReducer;
