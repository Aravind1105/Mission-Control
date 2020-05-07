import { createAction } from 'redux-actions';

// Saga actions
export const getOrganizations = createAction('@@saga/GET_ORGANIZATIONS');
export const modifyOrganization = createAction('@@saga/MODIFY_ORGANIZATION');

// State actions
export const getOrganizationsSuccess = createAction(
  '@@state/GET_ORGANIZATIONS_SUCCESS',
);
export const modifyOrganizationSuccess = createAction(
  '@@state/MODIFY_ORGANIZATION_SUCCESS',
);
