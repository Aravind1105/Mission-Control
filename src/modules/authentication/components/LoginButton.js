import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { authenticateUserSaga } from 'modules/authentication/actions';

const LoginButton = ({ authUser, ...props }) => (
  <Button positive onClick={authUser} {...props}>
    Sign in
  </Button>
);

const mapDispatchToProps = { authUser: authenticateUserSaga };

export default connect(null, mapDispatchToProps)(LoginButton);
