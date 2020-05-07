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

export const organizationsReducer = handleActions(
  {
    [getOrganizations]: state => ({
      ...state,
      list: [],
      isLoading: true,
    }),
    [getOrganizationsSuccess]: (state, { payload }) => ({
      ...state,
      list: payload,
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
