import { createSelector } from 'reselect';

export const getOrganizationsState = state => state.organizations;

export const getOrganizationBySlug = slug => createSelector(
  [getOrganizationsState],
  organizationsState => organizationsState.find((organization) => {
    return organization.slug === slug;
  }),
);
