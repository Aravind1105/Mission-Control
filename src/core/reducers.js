import { combineReducers } from 'redux';

// Shared reducers
import user from 'modules/authentication/reducers/userReducer';
import organizations from 'modules/organizations/reducers/organizationsReducer';
import core from './reducers/coreReducer';

// Module reducers
export default combineReducers({ core, user, organizations });
