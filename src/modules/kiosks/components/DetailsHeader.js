import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import CellHeartbeat from './CellHeartbeat';
import CellTemp from './CellTemp';
import CellDoorStatus from './CellDoorStatus';

import '../styles.less';

const DetailsHeader = ({ name, doorStatus, temperature, session, service }) => {
  return (
    <Grid stackable>
      <Grid.Row relaxed="very" columns={4}>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={doorStatus === 'open' ? 4 : 6}
        >
          <Header as="h3">{name}</Header>
          {service ? (
            <b style={{ textDecoration: 'underline', color: '#EB5757' }}>
              Out of Service
            </b>
          ) : (
            <></>
          )}
        </Grid.Column>
        <Grid.Column mobile={4} tablet={6} computer={4} className="flex-end">
          <b>
            Temp:&nbsp;
            <CellTemp temperature={temperature} />
          </b>
        </Grid.Column>
        <Grid.Column mobile={4} tablet={5} computer={3} className="flex-end">
          <b>Status:&nbsp;</b>
          <CellHeartbeat temperature={temperature} showTime={false} boldFont />
        </Grid.Column>
        <Grid.Column
          className="flex-end"
          mobile={4}
          tablet={4}
          computer={doorStatus === 'open' ? 5 : 3}
        >
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
