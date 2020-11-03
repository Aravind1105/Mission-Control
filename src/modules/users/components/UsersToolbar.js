import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Segment,
  Grid,
  Input,
  Dropdown,
  Button,
  Icon,
} from 'semantic-ui-react';
import history from 'lib/history';
import SearchInput from 'modules/shared/components/SearchInput';

const stateOptions = [
  { key: 'allusers', value: '', text: 'All Users' },
  { key: 'consumer', value: 'consumer', text: 'Consumer' },
  { key: 'admin', value: 'admin', text: 'Admin' },
];

const UsersToolbar = ({ changeSearch, changeUserType, openModal }) => {
  const addUserHandler = () => {
    history.push('/users/edit/new');
  };
  return (
    <Segment className="toolbar">
      <Grid stackable>
        <Grid.Row verticalAlign="middle" columns="equal">
          <Grid.Column width={7}>
            <SearchInput onChange={changeSearch} timeout={500} />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              placeholder="All types"
              selection
              options={stateOptions}
              className="full-width"
              onChange={changeUserType}
            />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button
              icon
              labelPosition="left"
              color="green"
              compact
              onClick={addUserHandler}
            // disabled={true}
            //! Disabled temporarily #golive2
            >
              <Icon name="right arrow" />
              Add User
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Link to="/kiosks/add" />
    </Segment>
  );
};

export default connect()(UsersToolbar);
