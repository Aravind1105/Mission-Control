import { handleActions } from 'redux-actions';
import { getSalesStatistic, getSalesStatisticSuccess } from '../actions';

const initialState = {
  salesStat: [],
  salesStatProducts: [],
  isSalesStatLoading: false,
};

const dashboard = handleActions(
  {
    [getSalesStatistic]: state => ({
      ...state,
      isSalesStatLoading: true,
    }),
    [getSalesStatisticSuccess]: (state, { payload }) => ({
      ...state,
      salesStat: payload.statistic,
      salesStatProducts: payload.products,
      isSalesStatLoading: false,
    }),
  },
  initialState,
);

export default dashboard;
