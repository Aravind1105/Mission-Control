import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider } from 'semantic-ui-react';

import InfoRow from 'modules/shared/components/InfoRow';

const DetailsInfo = ({
  children,
  session,
  serial,
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
              <InfoRow title="Serial" description={serial}/>
              <InfoRow title="Session" description={session ? session.type : 'no session'}/>
              <InfoRow title="Address" description={addressFull} />
              <InfoRow title="Organization" description={ownerOrganization} />
            </Grid.Row>
          </Grid>

        </Grid.Column>
        <Grid.Column width={4}>{children}</Grid.Column>
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
