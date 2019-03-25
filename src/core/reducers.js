import { combineReducers } from 'redux';
import core from './reducers/coreReducer';

// Shared reducers
import user from 'modules/authentication/reducers/userReducer';
import organizations from 'modules/organizations/reducers/organizationsReducer.js';

// Module reducers
export default combineReducers({ core, user, organizations });
