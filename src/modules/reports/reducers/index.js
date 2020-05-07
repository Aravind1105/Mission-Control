import { handleActions } from 'redux-actions';

import { getReports, getReportsSuccess } from '../actions';

const initialState = {
  data: null,
  isLoading: false,
};

export const reportsReducer = handleActions(
  {
    [getReports]: state => ({
      ...state,
      isLoading: true,
    }),
    [getReportsSuccess]: (state, { payload }) => ({
      ...state,
      data: payload,
      isLoading: false,
    }),
  },
  initialState,
);

export default reportsReducer;
