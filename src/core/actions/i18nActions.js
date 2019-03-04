import { createAction } from 'redux-actions';

// Saga actions
export const I18N_SAGA_CHANGE_LANGUAGE = '@@saga/I18N_SAGA_CHANGE_LANGUAGE';
export const changeLanguageSaga = createAction(I18N_SAGA_CHANGE_LANGUAGE);
