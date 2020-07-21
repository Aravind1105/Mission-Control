import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Segment, Grid, Input, Button, Icon } from 'semantic-ui-react';

const Toolbar = ({ search, setSearch }) => {
  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  };
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

          <Grid.Column textAlign="right">
            <Button
              icon
              labelPosition="left"
              color="green"
              compact
              as={Link}
              disabled={true} //! Disabled temporarily #golive2
              to="/kiosks/edit/new" 
            >
              <Icon name="right arrow" />
              Add Kiosk
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

Toolbar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default Toolbar;
