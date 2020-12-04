import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Image } from 'semantic-ui-react';

import history from 'lib/history';
import { getUserState } from 'modules/authentication/selectors';
import { logoutUserSaga } from 'modules/authentication/actions';
import UserElement from './UserElement';

const UserProfileBar = ({
  logoutUserSaga,
  userInfo: { name, picture, email },
  showName,
}) => {
  const trigger = (
    <span>
      <Image avatar src={picture} />
      {showName ? name : ''}
    </span>
  );

  return (
    <Dropdown trigger={trigger} pointing="top right" icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item>
          <UserElement name={name} email={email} avatar={picture} />
        </Dropdown.Item>
        <Dropdown.Item
          icon="setting"
          text="Settings"
          onClick={() => history.push("/settings/security")}
        />
        <Dropdown.Item
          icon="sign-out"
          text="Sign out"
          onClick={logoutUserSaga}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

const mapStateToProps = state => ({
  userInfo: getUserState(state),
});

const mapDispatchToProps = { logoutUserSaga };

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileBar);
