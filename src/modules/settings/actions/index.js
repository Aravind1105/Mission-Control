import { createAction } from 'redux-actions';

// Saga actions
export const createApiKey = createAction('@@saga/CREATE_API_KEY');
export const deleteApiKey = createAction('@@saga/DELETE_API_KEY');
export const loadApiKey = createAction('@@saga/LOAD_API_KEY');

// State actions
export const createApiKeySuccess = createAction(
  '@@state/CREATE_API_KEY_SUCCESS',
);
export const deleteApiKeySuccess = createAction(
  '@@state/DELETE_API_KEY_SUCCESS',
);
export const loadApiKeySuccess = createAction(
  '@@state/LOAD_API_KEY_SUCCESS',
);
