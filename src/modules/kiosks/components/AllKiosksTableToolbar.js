import React from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getKioskOptionsForTableDropdown } from 'modules/kiosks/selectors';

const doorStatuses = [
  {
    value: '',
    text: 'All statuses',
  },
  {
    value: 'open',
    text: 'Open',
  },
  {
    value: 'closed',
    text: 'Closed',
  },
];

const networkStatuses = [
  {
    value: '',
    text: 'All statuses',
  },
  {
    value: 'online',
    text: 'Online',
  },
  {
    value: 'offline',
    text: 'Offline',
  },
];

const Toolbar = ({
  changeKiosk,
  changeNetworkStatus,
  changeDoorStatus,
  kiosks,
}) => {
  const handleKioskChange = (e, { value }) => {
    changeKiosk(value);
  };
  const handleNetworkStatusChange = (e, { value }) => {
    changeNetworkStatus(value);
  };
  const handleDoorStatusChange = (e, { value }) => {
    changeDoorStatus(value);
  };
  return (
    <Grid>
      <Grid.Row verticalAlign="middle">
        <Grid.Column width={4}>
          <Dropdown
            placeholder="All Kiosks"
            selection
            options={kiosks}
            className="full-width"
            onChange={handleKioskChange}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Dropdown
            placeholder="Door Status"
            selection
            options={doorStatuses}
            className="full-width"
            onChange={handleDoorStatusChange}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Dropdown
            placeholder="Network Status"
            selection
            options={networkStatuses}
            className="full-width"
            onChange={handleNetworkStatusChange}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  kiosks: getKioskOptionsForTableDropdown(state),
});

export default connect(mapStateToProps)(Toolbar);
