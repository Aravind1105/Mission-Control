// import external modules
import React from 'react';
import styled from 'styled-components';
import bg from '../../assets/img/bg_blackboard.png';
import bt1 from '../../assets/img/bt_login_google/btn_google_signin_light_normal_web.png';
import bt2 from '../../assets/img/bt_login_google/btn_google_signin_light_focus_web.png';
import Logo from '../../assets/img/logo_white.png';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Panel = styled.div`
  border-radius: 15px;
  width: 400px;
  height: 600px;
  background: url(${bg}) center center no-repeat;
  color: #fff;
  text-align: center;
  margin: auto auto;
  -webkit-box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.7);
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.7);
  font-family: 'Cabin Sketch', cursive;
  p {
    font-size: 40px !important;
    margin-top: 40px !important;
    margin-bottom: 40px !important;
  }
`;

const LoginButton = styled.button`
  border: none;
  background: url(${bt1});
  width: 191px;
  height: 46px;
  :hover {
    background: url(${bt2});
  }
`;

class LoginPanel extends React.Component {
  render() {
    return (
      <Container>
        <Panel>
          <p>Welcome to</p>
          <img src={Logo} />
          <p>To continue</p>
          <p>please click</p>
          <p>the sign-in</p>
          <p>button below</p>
          <LoginButton onClick={this.props.onLogin} />
        </Panel>
      </Container>
    );
  }
}

export default LoginPanel;
