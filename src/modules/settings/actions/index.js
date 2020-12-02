import { createAction } from 'redux-actions';

// Saga actions
export const createApiKey = createAction('@@saga/CREATE_API_KEY');

// State actions
export const createApiKeySuccess = createAction(
  '@@state/CREATE_API_KEY_SUCCESS',
);
