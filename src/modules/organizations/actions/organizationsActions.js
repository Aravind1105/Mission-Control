import { createAction } from 'redux-actions';

// Saga actions
export const ORGANIZATIONS_SAGA_LOAD = '@@saga/ORGANIZATIONS_LOAD';
export const loadOrganizationsSaga = createAction(ORGANIZATIONS_SAGA_LOAD);

// State actions
export const ORGANIZATIONS_STATE_UPDATE = '@@state/ORGANIZATIONS_UPDATE';
export const updateOrganizations = createAction(ORGANIZATIONS_STATE_UPDATE);
