import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';

import Breadcrumbs from 'modules/shared/components/Breadcrumbs';
import BasicInfo from './components/BasicInfo';
import OrganizationFiles from './components/OrganizationFiles';
import RevenueInfo from './components/RevenueInfo';
import DetailsFridges from './components/DetailsFridges';
import DetailsUsers from './components/DetailsUsers';
import { getOrganizationBySlug } from './selectors';
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

const OrganizationDetails = ({ organization, getOrganizations }) => {
  useEffect(() => {
    if (!organization) {
      getOrganizations();
    }
  }, []);

  if (!organization) return null;

  return (
    <Grid className="organization">
      <Grid.Row columns="equal">
        <Grid.Column>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Breadcrumbs
                    backLink={backLink}
                    links={links}
                    activeLink={organization.name}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <BasicInfo {...organization} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <OrganizationFiles filesList={[]} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>

        <Grid.Column width={5}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <RevenueInfo />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <DetailsFridges />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <DetailsUsers />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  organization: getOrganizationBySlug(ownProps.match.params.slug)(state),
});

const mapDispatchToProps = {
  getOrganizations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationDetails);
