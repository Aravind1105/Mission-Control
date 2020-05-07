import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Image } from 'semantic-ui-react';

import { getUserState } from 'modules/authentication/selectors';
import { logoutUserSaga } from 'modules/authentication/actions';

const UserProfileBar = ({
  logoutUserSaga,
  userInfo: { name, picture },
  showName,
}) => {
  const trigger = (
    <span>
      <Image avatar src={picture} />
      {showName ? name : ''}
    </span>
  );
  return (
    <Dropdown trigger={trigger} pointing="top left" icon={null}>
      <Dropdown.Menu>
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
