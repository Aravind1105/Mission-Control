import { createAction } from 'redux-actions';

// Saga actions
export const initializeApp = createAction('@@saga/CORE_SAGA_INIT');

// State actions
export const setAppInitialized = createAction('@@state/CORE_STATE_SET_INIT');
export const setLanguageState = createAction('@@state/CORE_STATE_SET_LANGUAGE');
