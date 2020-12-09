import { createAction } from 'redux-actions';

// Saga actions
export const createApiKey = createAction('@@saga/CREATE_API_KEY');
export const removeApiKey = createAction('@@saga/REMOVE_API_KEY');

// State actions
export const createApiKeySuccess = createAction(
  '@@state/CREATE_API_KEY_SUCCESS',
);
export const removeApiKeySuccess = createAction(
  '@@state/REMOVE_API_KEY_SUCCESS',
);
