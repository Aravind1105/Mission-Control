import { handleActions } from 'redux-actions';

import { getAllTransactions, getAllTransactionsSuccess } from '../actions';

const initialState = {
  list: [],
  totalTransactions: 0,
  isLoading: false,
};

export const transactionsReducer = handleActions(
  {
    [getAllTransactions]: state => ({
      ...state,
      isLoading: true,
    }),
    [getAllTransactionsSuccess]: (state, { payload }) => ({
      ...state,
      list: payload.list,
      totalTransactions: payload.totalTransactions || 0,
      isLoading: false,
    }),
  },
  initialState,
);

export default transactionsReducer;
