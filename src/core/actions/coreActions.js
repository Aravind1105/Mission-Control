import { createAction } from 'redux-actions';

// Saga actions
export const CORE_SAGA_INIT = '@@saga/CORE_SAGA_INIT';
export const initializeApp = createAction(CORE_SAGA_INIT);

// State actions
export const CORE_STATE_SET_INIT = '@@state/CORE_STATE_SET_INIT';
export const setAppInitialized = createAction(CORE_STATE_SET_INIT);

export const CORE_STATE_SET_LANGUAGE = '@@state/CORE_STATE_SET_LANGUAGE';
export const setLanguageState = createAction(CORE_STATE_SET_LANGUAGE);
