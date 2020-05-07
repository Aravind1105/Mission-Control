import { createSelector } from 'reselect';
import get from 'lodash/get';

export const getOrganizationsState = state => state.organizations.list;

export const getOrganizationInitValues = slug =>
  createSelector(getOrganizationsState, organizations => {
    const item = organizations.find(el => el.slug === slug) || {};
    const address = get(item, 'address.0.properties', null);
    return {
      ...item,
      address: address
        ? {
            ...address,
            country: { value: address.country, label: address.country },
          }
        : null,
      description: item.description || '',
      id: item._id || '',
    };
  });

export const getOrganizationBySlug = slug =>
  createSelector(getOrganizationsState, organizations => {
    const org = organizations.find(organization => organization.slug === slug);

    if (!org) return null;
    const address = {
      street: get(org, 'address.0.properties.line1', ''),
      city: get(org, 'address.0.properties.city', ''),
      state: get(org, 'address.0.properties.state', ''),
    };
    const data = {
      id: org._id || '',
      name: org.name || '',
      logo: org.imageUrl || '',
      slug: org.slug || '',
      description: org.description || '',
      address,
    };
    return data;
  });

export const getOrganizationsAsOptions = createSelector(
  [getOrganizationsState],
  org => org.map(el => ({ key: el._id, value: el._id, text: el.name })),
);
