import { useDispatch } from 'react-redux';
import { authenticateUserSaga, handleAuthUserSaga } from './actions';
import './loginScreen.less';

const LoginScreen = () => {
  const dispatch = useDispatch();

  if (/access_token|id_token|error/.test(window.location.hash)) {
    dispatch(handleAuthUserSaga());
    return false;
  }
  dispatch(authenticateUserSaga());
  return false;
};

export default LoginScreen;
