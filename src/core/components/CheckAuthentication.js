import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getAuth,
  getRoot,
} from 'modules/authentication/selectors/userSelectors';

const CheckAuthentication = ({ children, isAuthenticated }) =>
  children(isAuthenticated);

const mapStateToProps = state => ({
  isAuthenticated: getAuth(state) && getRoot(state),
});

export default withRouter(connect(mapStateToProps)(CheckAuthentication));
