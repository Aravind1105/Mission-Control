import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Input,
  Button,
  Icon,
  Dropdown,
  Divider,
} from 'semantic-ui-react';

import { getActiveUserIDState } from '../../users/selectors';

const Toolbar = ({
  search,
  setSearch,
  kiosks,
  setKiosk,
  kiosksStatus,
  setKioskStatus,
  rootUser,
  // kiosksNetworkStatus, //!LIV-2285
  // setKioskNetworkStatus //!LIV-2285
}) => {
  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  };
  const handleKioskChange = (e, { value }) => {
    const text = value === 'All' ? '' : value;
    setKiosk(text);
  };
  const handleKiosksStatus = (e, { value }) => {
    const text = value === 'All' ? '' : value;
    setKioskStatus(text);
  };
  // const handleKiosksNetworkStatus = (e, { value }) => { //!LIV-2285
  //   const text = value === 'All' ? '' : value;
  //   setKioskNetworkStatus(text)
  // };
  return (
    <Segment className="toolbar">
      <Grid stackable>
        <Grid.Row verticalAlign="middle" columns="equal">
          <Grid.Column width={6}>
            <Input
              icon="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="full-width"
            />
          </Grid.Column>
          {rootUser && (
            <Grid.Column textAlign="right">
              <Button
                icon
                labelPosition="left"
                color="green"
                compact
                as={Link}
                to="/kiosks/edit/new"
              >
                <Icon name="right arrow" />
                Add Kiosk
              </Button>
            </Grid.Column>
          )}
        </Grid.Row>

        <Divider style={{ marginTop: 0, marginBottom: 0 }} />

        <Grid.Row verticalAlign="middle" columns="equal">
          <Grid.Column width={3}>
            <Dropdown
              placeholder="Kiosk"
              selection
              className="full-width"
              onChange={handleKioskChange}
              options={kiosks}
            />
          </Grid.Column>

          <Grid.Column width={3}>
            <Dropdown
              placeholder="Door Status"
              selection
              className="full-width"
              onChange={handleKiosksStatus}
              options={kiosksStatus}
            />
          </Grid.Column>

          {/* <Grid.Column width={3}> //!LIV-2285
          <Dropdown
              placeholder="Network Status"
              selection
              className="full-width"
              onChange={handleKiosksNetworkStatus}
              options={kiosksNetworkStatus}
          />
        </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

Toolbar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  rootUser: state.user.root,
});

export default connect(mapStateToProps)(Toolbar);
