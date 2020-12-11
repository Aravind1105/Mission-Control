import { handleActions } from 'redux-actions';
import {
  createApiKey,
  createApiKeySuccess,
  deleteApiKey,
  deleteApiKeySuccess,
  loadApiKey,
  loadApiKeySuccess,
} from '../actions';

const initialState = {
  apiKey: {
    _id: '',
    secret: '',
    explanation: {},
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
        _id: payload._id,
        secret: payload.secret,
        explanation: payload.explanation,
      },
      isLoading: false,
    }),
    [loadApiKey]: state => ({
      ...state,
    }),
    [loadApiKeySuccess]: (state, { payload }) => ({
      ...state,
      apiKey: {
        _id: payload._id,
        secret: payload.secret,
        explanation: payload.explanation,
      },
    }),
    [deleteApiKey]: state => ({
      ...state,
      isLoading: true,
    }),
    [deleteApiKeySuccess]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

export default settingsReducer;
