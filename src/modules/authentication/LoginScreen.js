import { from } from 'apollo-link';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticateUserSaga, handleAuthUserSaga } from './actions';
import './loginScreen.less';
import { LoginButton } from './components';

const LoginScreen = () => {
  const dispatch = useDispatch();

  if (/access_token|id_token|error/.test(window.location.hash)) {
    dispatch(handleAuthUserSaga());
    return false;
  }
  dispatch(authenticateUserSaga());
  return null;
};

export default LoginScreen;
