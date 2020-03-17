import { createAction } from 'redux-actions';

// Saga actions
export const getOrganizations = createAction('@@saga/GET_ORGANIZATIONS');

export const ORGANIZATIONS_SAGA_ADD = '@@saga/ORGANIZATIONS_ADD';
export const addOrganizationsSaga = createAction(ORGANIZATIONS_SAGA_ADD);

// State actions
export const ORGANIZATIONS_STATE_UPDATE = '@@state/ORGANIZATIONS_UPDATE';
export const updateOrganizations = createAction(ORGANIZATIONS_STATE_UPDATE);
