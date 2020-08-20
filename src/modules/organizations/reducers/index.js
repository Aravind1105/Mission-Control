import { handleActions } from 'redux-actions';
import {
  getOrganizationsSuccess,
  getOrganizations,
  modifyOrganizationSuccess,
} from '../actions';

const initialState = {
  list: [],
  isLoading: false,
};

const organizationsReducer = handleActions(
  {
    [getOrganizations]: state => ({
      ...state,
      list: [],
      isLoading: true,
    }),
    [getOrganizationsSuccess]: (state, { payload }) => ({
      ...state,
      list: payload.list,
      total: payload.total,
      isLoading: false,
    }),
    [modifyOrganizationSuccess]: (state, { payload }) => ({
      ...state,
      list: payload,
    }),
  },
  initialState,
);

export default organizationsReducer;
