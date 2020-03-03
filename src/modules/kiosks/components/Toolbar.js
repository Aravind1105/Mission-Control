import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Segment,
  Grid,
  Input,
  Dropdown,
  Button,
  Icon,
} from 'semantic-ui-react';

const stateOptions = [
  { key: 'client', value: 'client', text: 'client' },
  { key: 'license', value: 'license', text: 'license' },
];

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

          <Grid.Column>
            <Dropdown
              placeholder="All types"
              selection
              options={stateOptions}
              className="full-width"
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              placeholder="All types"
              selection
              options={stateOptions}
              className="full-width"
            />
          </Grid.Column>

          <Grid.Column textAlign="right">
            <Button icon labelPosition="left" color="green" compact>
              <Icon name="right arrow" />
              Add Kiosk
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Link to="/kiosks/add" />
    </Segment>
  );
};

Toolbar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default Toolbar;
