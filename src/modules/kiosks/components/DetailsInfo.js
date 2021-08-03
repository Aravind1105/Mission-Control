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
  let name = '';
  let addressLine1 = '';
  let addressLine2 = '';
  let addressLine3 = '';
  let addressSecondLine = '';
  let addressThirdLine = '';
  let sessionType = '';

  let address = location && location.address;

  if (address && address.line1 !== null) {
    name = address.name ? `${address.name}` : '';
    addressLine1 += `${address.line1}`;
    addressLine2 += address.line2 ? `${address.line2}` : '';
    addressSecondLine += `${address.postalCode} ${address.city}`;
    if (address.state) addressSecondLine += `, ${address.state}`;
    addressThirdLine += `${address.country}`;
  }

  if (session) {
    if (session.type === 'terminal_purchase') sessionType = 'ZVT Terminal';
    else if (session.type === 'member_purchase') sessionType = 'Member Card';
    else if (session.type === 'refill') sessionType = 'Replenisher Mode';
    else if (session.type === 'purchase') sessionType = 'Consumer App';
  } else sessionType = 'No Session';

  return (
    <div className="kiosk-info">
      <Grid>
        <Grid.Column mobile={8} tablet={10} computer={12}>
          <Grid>
            <Grid.Row>
              <InfoRow title="Serial" description={serial} />
              <InfoRow title="Session" description={sessionType} />
              {addressLine1 !== '' && (
                <InfoRow title="Address" description={name} />
              )}
              {addressLine1 !== '' && <InfoRow description={addressLine1} />}
              {addressLine2 !== '' && <InfoRow description={addressLine2} />}
              {addressLine3 !== '' && <InfoRow description={addressLine3} />}
              {addressSecondLine !== '' && (
                <InfoRow description={addressSecondLine} />
              )}
              {addressThirdLine !== '' && (
                <InfoRow description={addressThirdLine} />
              )}
              {notes && (
                <InfoRow title="Directions / Notes" description={notes} />
              )}
              <InfoRow title="Organization" description={ownerOrganization} />
              {/* <InfoRow title="Pin" description={pin} /> */}
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column mobile={8} tablet={6} computer={4}>
          {children}
        </Grid.Column>
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
