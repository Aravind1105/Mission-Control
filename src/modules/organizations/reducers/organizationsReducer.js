import { handleActions } from 'redux-actions';
import { ORGANIZATIONS_STATE_UPDATE } from '../actions/organizationsActions';

const initialState = [];

export const organizationsReducer = handleActions(
  {
    [ORGANIZATIONS_STATE_UPDATE]: (state, { payload }) => payload,
  },
  initialState,
);

export default organizationsReducer;
