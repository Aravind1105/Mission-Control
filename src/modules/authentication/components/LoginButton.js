import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

import { authenticateUserSaga } from 'modules/authentication/actions';

const LoginButton = ({ authUser, ...props }) => (
  <Button primary onClick={authUser} icon labelPosition="left" {...props}>
    <Icon name="google" />
    Log in
  </Button>
);

const mapDispatchToProps = { authUser: authenticateUserSaga };

export default connect(null, mapDispatchToProps)(LoginButton);
