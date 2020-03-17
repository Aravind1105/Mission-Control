import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider } from 'semantic-ui-react';

const InfoRow = ({ title, description = '' }) => (
  <div className="info-row">
    <div className="info-title">{title}</div>
    <div className="info-description">{description}</div>
  </div>
);
InfoRow.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

const DetailsInfo = ({
  children,
  session,
  location: { address },
  ownerOrganization,
}) => {
  const addressFull = address
    ? [address.city, address.line1, address.state].join(', ')
    : '';
  return (
    <div className="kiosk-info">
      <Grid>
        <Grid.Column width={12}>
          <div className="info-wrapper">
            <InfoRow title="Device version:" description="fsdaf d fd" />
            <InfoRow title="Connection:" description="sdasds" />
            <InfoRow title="Session:" description={session || 'no session'} />
          </div>
          <Divider />
          <div className="info-wrapper">
            <InfoRow title="Address:" description={addressFull} />
            <InfoRow title="Organization:" description={ownerOrganization} />
            <InfoRow title="Logistics Org:" description="sdasds" />
            <InfoRow title="Local contact:" description="sdasds" />
            <InfoRow title="EMail:" description="sdasds" />
            <InfoRow title="Phone Number:" description="+7(524)-52-35-845" />
            <InfoRow title="Admin Card ID(s):" description="d3zsdf845" />
            <InfoRow title="Location Notes:" description="d3zsdf845" />
          </div>
        </Grid.Column>
        <Grid.Column width={4}>{children}</Grid.Column>
      </Grid>
      <Divider />
      <div className="info-wrapper">
        <InfoRow title="Allowance:" description="2 Euros Daily" />
        <InfoRow title="Promotions:" description="30% dsa fd gfds" />
      </div>
      <Divider />
      <div className="info-wrapper">
        <InfoRow title="Out of service:" description="Date here" />
      </div>
    </div>
  );
};

DetailsInfo.propTypes = {
  session: PropTypes.string,
  ownerOrganization: PropTypes.string.isRequired,
  location: PropTypes.shape({
    address: PropTypes.shape({
      line1: PropTypes.string.isRequired,
      line2: PropTypes.string,
      postalCode: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DetailsInfo;
