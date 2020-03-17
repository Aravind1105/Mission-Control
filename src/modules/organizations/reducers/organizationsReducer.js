import { handleActions } from 'redux-actions';
import { ORGANIZATIONS_STATE_UPDATE, getOrganizations } from '../actions';

const initialState = {
  list: [],
  isLoading: false,
};

export const organizationsReducer = handleActions(
  {
    [getOrganizations]: state => ({
      ...state,
      list: [],
      isLoading: true,
    }),
    [ORGANIZATIONS_STATE_UPDATE]: (state, { payload }) => ({
      ...state,
      list: payload,
      isLoading: false,
    }),
  },
  initialState,
);

export default organizationsReducer;
