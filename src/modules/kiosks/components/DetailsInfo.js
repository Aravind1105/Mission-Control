import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider } from 'semantic-ui-react';

import InfoRow from 'modules/shared/components/InfoRow';

const DetailsInfo = ({
  children,
  session,
  location: { address },
  ownerOrganization,
}) => {
  const addressFull = address
    ? [address.city, address.line1, address.state].filter(el => el).join(', ')
    : '';
  return (
    <div className="kiosk-info">
      <Grid>
        <Grid.Column width={12}>
          <Grid>
            <Grid.Row>
              <InfoRow title="Device version" description="fsdaf d fd" />
              <InfoRow title="Connection" description="sdasds" />
              <InfoRow
                title="Session"
                description={session ? session.type : 'no session'}
              />
            </Grid.Row>
          </Grid>

          <Divider />

          <Grid>
            <Grid.Row>
              <InfoRow title="Address" description={addressFull} />
              <InfoRow title="Organization" description={ownerOrganization} />
              <InfoRow title="Logistics Org" description="sdasds" />
              <InfoRow title="Local contact" description="sdasds" />
              <InfoRow title="EMail" description="sdasds" />
              <InfoRow title="Phone Number" description="+7(524)-52-35-845" />
              <InfoRow title="Admin Card ID(s)" description="d3zsdf845" />
              <InfoRow title="Location Notes" description="d3zsdf845" />
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column width={4}>{children}</Grid.Column>
      </Grid>

      <Divider />

      <Grid>
        <Grid.Row>
          <InfoRow title="Allowance" description="2 Euros Daily" />
          <InfoRow title="Promotions" description="30% dsa fd gfds" />
        </Grid.Row>
      </Grid>

      <Divider />

      <Grid>
        <Grid.Row>
          <InfoRow title="Out of service" description="Date here" />
        </Grid.Row>
      </Grid>
    </div>
  );
};

DetailsInfo.propTypes = {
  session: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ]),
  ownerOrganization: PropTypes.string.isRequired,
  location: PropTypes.shape({
    address: PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      postalCode: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailsInfo;
