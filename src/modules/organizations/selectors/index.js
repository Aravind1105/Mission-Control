import { createSelector } from 'reselect';

export const getOrganizationsState = state => state.organizations.list;

export const getOrganizationBySlug = slug =>
  createSelector([getOrganizationsState], organizationsState =>
    organizationsState.find(organization => {
      return organization.slug === slug;
    }),
  );

export const getOrganizationsAsOptions = createSelector(
  [getOrganizationsState],
  organizations =>
    organizations.map(el => ({ key: el._id, value: el._id, text: el.name })),
);
