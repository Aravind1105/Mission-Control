import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

import { authenticateUserSaga } from 'modules/authentication/actions';

const LoginButton = ({ doLoginUser, ...props }) => (
  <Button primary onClick={doLoginUser} icon labelPosition="left" {...props}>
    <Icon name="google" />
    Sign in with Google
  </Button>
);

const mapDispatchToProps = dispatch => ({
  doLoginUser: () => dispatch(authenticateUserSaga()),
});

export default connect(null, mapDispatchToProps)(LoginButton);
