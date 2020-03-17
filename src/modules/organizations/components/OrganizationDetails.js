import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import DetailsBreadcrumb from './DetailsBreadcrumb';
import DetailsInfo from './DetailsInfo';
import DetailsOrders from './DetailsOrders';
import DetailsFridges from './DetailsFridges';
import DetailsInventory from './DetailsInventory';
import { getOrganizationBySlug } from '../selectors';

const OrganizationDetails = ({ match, organization }) => {
  const [selectedFridge, setSelectedFridge] = useState(null);

  useEffect(() => {
    if (!organization) {
      console.log('FETCH ORGANIZATION');
    }
  }, []);

  if (!organization) return false;

  return (
    <Grid stackable>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <DetailsBreadcrumb organizationName={organization.name} />
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <DetailsInfo data={organization} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <DetailsOrders fridgeID={selectedFridge} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>

        <Grid.Column width={5}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <DetailsFridges setSelectedFridge={setSelectedFridge} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <DetailsInventory selectedFridge={selectedFridge} />
                </Segment>
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

export default withRouter(connect(mapStateToProps)(OrganizationDetails));
