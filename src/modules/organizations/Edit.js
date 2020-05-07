import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import OrganizationForm from './components/Form';
import { initValuesContactPerson } from './components/Form/ContactPersonGroup';
import { getOrganizationsState, getOrganizationInitValues } from './selectors';
import { getOrganizations } from './actions';

const links = [
  {
    name: 'Home',
    link: '/dashboard',
  },
  {
    name: 'Organizations',
    link: '/organizations',
  },
];
const backLink = {
  name: 'Back to organizations',
  link: '/organizations',
};

const defaultValues = {
  _id: '',
  name: '',
  role: {
    client: false,
    operator: false,
    logistics: false,
    manufacturer: false,
  },
  address: {
    postalCode: '',
    country: null,
    city: '',
    line1: '',
  },
  invoiceAddr: false,
  additionalPerson: false,
  contactPerson: [
    {
      ...initValuesContactPerson,
    },
  ],
  weekdays: [false, false, false, false, false, false, false],
};

const OrganizationEdit = ({
  initialValues,
  match,
  orgOptions,
  getOrganizations,
}) => {
  const isNewOrg = !match.params.slug;
  const title = isNewOrg ? 'Add New Organization' : 'Edit Organization';

  useEffect(() => {
    if (match.params.slug) {
      getOrganizations();
    }
  }, []);

  return (
    <>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Breadcrumbs links={links} backLink={backLink} activeLink={title} />
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Segment className="organization">
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Header as="h3">{title}</Header>
            </Grid.Column>
            {initialValues._id && (
              <Grid.Column textAlign="right">
                <b>Organization ID:&nbsp;</b>
                {initialValues.id}
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
        <Divider />
        <OrganizationForm
          key={initialValues.id}
          initialValues={initialValues}
          orgOptions={orgOptions}
        />
      </Segment>
    </>
  );
};

const mapStateToProps = (state, { match }) => {
  const organization = getOrganizationInitValues(match.params.slug)(state);
  const initialValues = {
    ...defaultValues,
    ...organization,
    address: organization.address || defaultValues.address,
  };

  return {
    initialValues,
    orgOptions: getOrganizationsState(state).map(el => ({
      value: el._id,
      label: el.name,
    })),
  };
};

const mapDispatchToProps = {
  getOrganizations,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationEdit);
