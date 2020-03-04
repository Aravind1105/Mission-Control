import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Icon } from 'semantic-ui-react';

const DetailsHeader = ({ name, temp, connection, doorStatus }) => {
  const tempText = Number.isNaN(temp) ? '' : ` ${temp}°C`;
  return (
    <Grid>
      <Grid.Row relaxed="very" columns={4}>
        <Grid.Column width={6}>
          <Header as="h3">{`${name}`}</Header>
        </Grid.Column>
        <Grid.Column width={3}>
          <Icon name="signal" color="green" />
          {connection ? `${connection}%` : ''}
        </Grid.Column>
        <Grid.Column width={3}>
          Temp:
          <b className="textGreen">{tempText}</b>
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
