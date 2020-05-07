import { handleActions } from 'redux-actions';
import { setAppInitialized, setLanguageState } from '../actions/coreActions';

const initialState = {
  initialized: false,
  language: 'en',
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
  },
  initialState,
);

export default coreReducer;
