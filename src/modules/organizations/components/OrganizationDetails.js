import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import { Grid, Segment, Breadcrumb, Button, Icon } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

import DetailsBreadcrumb from './DetailsBreadcrumb';
import DetailsInfo from './DetailsInfo';
import DetailsOrders from './DetailsOrders';
import DetailsFridges from './DetailsFridges';
import DetailsInventory from './DetailsInventory';

//mockData
import { orgsData } from '../mocks/organziationsMocks';

const OrganizationDetails = ({ match }) => {
  const [selectedFridge, setSelectedFridge] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [organizationData, setOrganizationData] = useState({});

  useEffect(() => {
    if (!initialized) {
      const orgData = orgsData.filter(org => org.id === match.params.id);
      setOrganizationData(orgData[0]);
      setInitialized(true);
    }
  });

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column mobile={16} computer={11}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <DetailsBreadcrumb />
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <DetailsInfo data={organizationData} />
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

        <Grid.Column mobile={16} computer={5}>
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

export default withRouter(OrganizationDetails);
