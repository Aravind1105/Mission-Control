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

const DetailsInfo = ({ children }) => (
  <div className="kiosk-info">
    <Grid>
      <Grid.Column width={12}>
        <div className="info-wrapper">
          <InfoRow title="Device version:" description="fsdaf d fd" />
          <InfoRow title="Connection:" description="sdasds" />
        </div>
        <Divider />
        <div className="info-wrapper">
          <InfoRow title="Address:" description="sdasds" />
          <InfoRow title="Organization:" description="sdasds" />
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

export default DetailsInfo;
