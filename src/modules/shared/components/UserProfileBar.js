import React, { memo } from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getUserState } from 'modules/authentication/selectors/userSelectors';
import { logoutUserSaga } from 'modules/authentication/actions/userActions';

const UserProfileBar = ({
  handleLogout,
  userInfo: { name, picture },
  showName,
}) => {
  const trigger = (
    <span>
      <Image avatar src={picture} /> {showName && name}
    </span>
  );
  return (
    <Dropdown trigger={trigger} pointing="top left" icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item icon="sign-out" text="Sign out" onClick={handleLogout} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

const mapStateToProps = state => ({
  userInfo: getUserState(state),
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logoutUserSaga()),
});

export default memo(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserProfileBar),
);
