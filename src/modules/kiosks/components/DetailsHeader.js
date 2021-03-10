import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import CellHeartbeat from './CellHeartbeat';
import CellTemp from './CellTemp';
import CellDoorStatus from './CellDoorStatus';

import '../styles.less';

const DetailsHeader = ({ name, doorStatus, temperature, session }) => {
  return (
    <Grid stackable>
      <Grid.Row verticalAlign="align-text-top" relaxed="very" columns={4}>
        <Grid.Column width={doorStatus === 'open' ? 4 : 6} className="flex-end">
          <Header as="h3">{name}</Header>
        </Grid.Column>
        <Grid.Column width={4} className="flex-end">
          <b>
            Temp:&nbsp;
            <CellTemp temperature={temperature} />
          </b>
        </Grid.Column>
        <Grid.Column width={3} className="flex-end">
          <b>
            Status:&nbsp;
            <CellHeartbeat
              temperature={temperature}
              showTime={false}
              boldFont
            />
          </b>
        </Grid.Column>
        <Grid.Column className="flex-end" width={doorStatus === 'open' ? 5 : 3}>
          <b>
            Door:&nbsp;
            <CellDoorStatus doorStatus={doorStatus} session={session} />
          </b>
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
  doorStatus: PropTypes.string,
};

export default DetailsHeader;
