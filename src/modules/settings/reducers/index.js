import { handleActions } from 'redux-actions';
import {
  createApiKey, createApiKeySuccess,
} from '../actions';

const initialState = {
  apiKey: {
    id: '',
    secret: '',
  },
};

const settingsReducer = handleActions(
  {
    [createApiKey]: state => ({
      ...state,
      isLoading: true,
    }),
    [createApiKeySuccess]: (state, { payload }) => ({
      ...state,
      apiKey: {
        id: payload.id,
        secret: payload.secret,
      },
      isLoading: false,
    }),
  },
  initialState,
);

export default settingsReducer;
