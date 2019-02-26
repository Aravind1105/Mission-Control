import { combineReducers } from 'redux';
import core from './reducers/coreReducer';

// Shared reducers
import user from 'modules/authentication/reducers/userReducer';

// Module reducers
export default combineReducers({ core, user });
