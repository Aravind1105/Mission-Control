import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { handleAuthUserSaga } from './actions/userActions';
import { LoginButton } from './components';
import { Logo } from 'modules/shared/components';
import bgBoard from '../../styling/assets/images/bg_blackboard.png';
import bg from '../../styling/assets/images/bg.jpg';

import './loginScreen.less';

const LoginScreen = props => {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    props.handleAuth();
    return false;
  }

  return (
    <div
      className="login-screen-wrapper"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Grid
        className="login-screen"
        container
        textAlign="center"
        style={{
          height: '100%',
        }}
        verticalAlign="middle"
      >
        <Grid.Column
          mobile={16}
          style={{ background: `url(${bgBoard}) center center no-repeat` }}
        >
          <p>Welcome to</p>
          <Logo width={225} centered />
          <p>To continue</p>
          <p>please click</p>
          <p>the sign-in</p>
          <p>button below</p>
          <LoginButton style={{ marginTop: 12 }} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  handleAuth: () => dispatch(handleAuthUserSaga()),
});

export default connect(
  null,
  mapDispatchToProps,
)(LoginScreen);
