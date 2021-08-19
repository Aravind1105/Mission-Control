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
import './styles.less';

const stateOptions = [
  { key: 'allusers', value: '', text: 'All Users' },
  { key: 'consumer', value: 'consumer', text: 'Consumer' },
  { key: 'admin', value: 'admin', text: 'Admin' },
];

const UsersToolbar = ({ changeSearch, search, changeUserType, openModal }) => {
  const addUserHandler = () => {
    history.push('/users/edit/new');
  };
  return (
    <Segment className="toolbar">
      <Grid stackable>
        <Grid.Row verticalAlign="middle">
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <SearchInput onChange={changeSearch} timeout={500} value={search} />
          </Grid.Column>
          {/* <Grid.Column width={5}> */}
          {/* <Dropdown
              placeholder="All types"
              selection
              options={stateOptions}
              className="full-width"
              onChange={(event, data) => changeUserType(data.value)}
            /> */}
          {/* </Grid.Column> */}
          {/* <Grid.Column textAlign="right">
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
          </Grid.Column> */}
        </Grid.Row>
      </Grid>
      <Link to="/kiosks/add" />
    </Segment>
  );
};

export default connect()(UsersToolbar);
