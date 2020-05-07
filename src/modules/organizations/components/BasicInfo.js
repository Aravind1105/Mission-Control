import React from 'react';
import {
  Segment,
  Grid,
  Header,
  Divider,
  Image,
  Button,
  Icon,
} from 'semantic-ui-react';

import InfoRow from 'modules/shared/components/InfoRow';
import history from 'lib/history';

const BasicInfo = ({
  name,
  logo,
  address,
  id,
  description,
  type,
  status,
  slug,
}) => {
  const handlerEditClick = () => {
    history.push(`/organizations/edit/${slug}`);
  };
  return (
    <Segment>
      <Header as="h3">Organization Details</Header>
      <Divider />
      <div>
        Last updated: <i>mockDate</i> by <i>mockUserName</i>
      </div>
      <Grid className="info">
        <Grid.Row columns="equal">
          <Grid.Column width={4}>
            <Image src={logo} alt="name" centered />
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{name}</Header>
            <Grid>
              <Grid.Row>
                <InfoRow title="ID" description={id} />
                <InfoRow title="Type" description={type} />
                <InfoRow title="Status" description={status} />
              </Grid.Row>
              <Grid.Row>
                <InfoRow title="Street" description={address.street} />
                <InfoRow title="City" description={address.city} />
                <InfoRow title="State" description={address.state} />
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={2} textAlign="right">
            <Button
              title="Edit organization"
              icon={<Icon name="edit" />}
              onClick={handlerEditClick}
              basic
              compact
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider />

      <Grid>
        <Grid.Row>
          <InfoRow title="Opening Hours" />
        </Grid.Row>
      </Grid>

      <Divider />

      <Grid>
        <Grid.Row>
          <InfoRow title="Contact Person" />
          <InfoRow title="Role" />
          <InfoRow title="Telephone" />
          <InfoRow title="Email" />
        </Grid.Row>
      </Grid>

      <Divider />

      <Grid>
        <Grid.Row>
          <InfoRow title="USt-IdNr." />
          <InfoRow title="IBAN" />
          <InfoRow title="BIC" />
        </Grid.Row>
      </Grid>

      <Divider />

      <Grid>
        <Grid.Row>
          <InfoRow title="Connected with" />
        </Grid.Row>
      </Grid>

      <Divider />

      <Grid>
        <Grid.Row>
          <InfoRow title="Additional Notes" description={description} />
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default BasicInfo;
