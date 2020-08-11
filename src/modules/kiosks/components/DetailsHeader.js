import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Icon } from 'semantic-ui-react';
import CellHeartbeat from './CellHeartbeat';

const DetailsHeader = ({ name, temp, doorStatus, temperature }) => {
  const tempText = Number.isNaN(temp) ? '' : ` ${temp}°C`;
  return (
    <Grid>
      <Grid.Row relaxed="very" columns={4}>
        <Grid.Column width={6}>
          <Header as="h3">{name}</Header>
        </Grid.Column>
        <Grid.Column width={3}>
          Temp:
          <b className="textRed">{tempText}</b>
        </Grid.Column>
        <Grid.Column width={3}>
          Status:
          <CellHeartbeat temperature={temperature} showTime={false} boldFont />
        </Grid.Column>
        <Grid.Column>
          Door:&nbsp;
          <b className="textGreen text-capitalize">{doorStatus}</b>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

DetailsHeader.defaultProps = {
  name: '',
  doorStatus: 'unknown',
};

DetailsHeader.propTypes = {
  name: PropTypes.string,
  temp: PropTypes.number,
  connection: PropTypes.number,
  doorStatus: PropTypes.string,
};

export default DetailsHeader;
