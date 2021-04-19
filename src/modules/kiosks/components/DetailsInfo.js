import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import InfoRow from 'modules/shared/components/InfoRow';

const DetailsInfo = ({
  children,
  session,
  serial,
  location,
  ownerOrganization,
  notes,
  pin,
}) => {
  let addressLine1 = '';
  let addressLine2 = '';
  let addressLine3 = '';
  let addressSecondLine = '';
  let addressThirdLine = '';

  let address = location && location.address;

  if (address && address.line1 !== null) {
    addressLine1 += address.name ? `${address.name}, ` : '';
    addressLine1 += `${address.line1}`;
    addressLine2 += address.line2 ? `${address.line2}` : '';
    if (address.line2) addressLine2 += `, ${address.state}`;
    else addressLine3 += address.state;
    addressSecondLine += `${address.postalCode} ${address.city}`;
    addressThirdLine += `${address.country}`;
  }
  let sessionType = 'no session';
  if (session) {
    sessionType = session.type;
    if (sessionType === 'refill') {
      sessionType = 'Replenisher Mode';
    }
  }

  return (
    <div className="kiosk-info">
      <Grid>
        <Grid.Column width={12}>
          <Grid>
            <Grid.Row>
              <InfoRow title="Serial" description={serial} />
              <InfoRow title="Session" description={sessionType} />
              {addressLine1 !== '' && (
                <InfoRow title="Address" description={addressLine1} />
              )}
              {addressLine2 !== '' && <InfoRow description={addressLine2} />}
              {addressLine3 !== '' && <InfoRow description={addressLine3} />}
              {addressLine1 !== '' && (
                <InfoRow description={addressSecondLine} />
              )}
              {addressLine1 !== '' && (
                <InfoRow description={addressThirdLine} />
              )}
              {notes && (
                <InfoRow title="Directions / Notes" description={notes} />
              )}
              <InfoRow title="Organization" description={ownerOrganization} />
              <InfoRow title="Pin" description={pin} />
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
