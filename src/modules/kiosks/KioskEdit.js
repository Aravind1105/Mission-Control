import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import Loader from 'modules/shared/components/Loader';
import { getOrganizations } from 'modules/organizations/actions';
import { getOrganizationsAsOptions } from 'modules/organizations/selectors';
import KioskForm from './components/KioskForm';
import { selectKiosk, getKiosk } from './actions';
import { getKioskInitValues } from './selectors';
// import ProductPriceHistory from './components/ProductPriceHistory';

const links = [
  {
    name: 'Home',
    link: '/dashboard',
  },
  {
    name: 'Kiosks',
    link: '/kiosks',
  },
];
const backLink = {
  name: 'Back to kiosks',
  link: '/kiosks',
};

const KioskEdit = ({
  match: { params },
  initialValues,
  isOrgLoading,
  isKioskLoading,
  organizationsOptions,
  getOrganizations,
  selectKiosk,
  getKiosk,
}) => {
  useEffect(() => {
    const isEdit = params.id !== 'new';
    const hasData = isEdit ? initialValues.id === params.id : true;

    if (!isOrgLoading) getOrganizations();
    if (!hasData && !isKioskLoading) {
      getKiosk(params.id);
    }

    return () => selectKiosk(null);
  }, []);

  const isEdit = params.id !== 'new';
  const hasData = isEdit ? initialValues.id === params.id : true;
  const isLoaded = !isOrgLoading && !!organizationsOptions.length && hasData;
  const kioskName = isEdit ? initialValues.name : 'New kiosk';
  return (
    <Grid stackable>
      <Grid.Column width={11}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Breadcrumbs
                  links={links}
                  backLink={backLink}
                  activeLink={kioskName}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          {isLoaded ? (
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header as="h3">{kioskName}</Header>
                  <Divider />
                  <KioskForm
                    initialValues={initialValues}
                    organizations={organizationsOptions}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          ) : (
            <Loader />
          )}
        </Grid>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => ({
  initialValues: getKioskInitValues(state),
  organizationsOptions: getOrganizationsAsOptions(state),
  isOrgLoading: state.organizations.isOrgLoading,
  isKioskLoading: state.kiosks.kioskIsLoading,
});

const mapDispatchToProps = {
  getOrganizations,
  selectKiosk,
  getKiosk,
};

export default connect(mapStateToProps, mapDispatchToProps)(KioskEdit);
