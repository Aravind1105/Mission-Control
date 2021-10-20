import { handleActions } from 'redux-actions';

import {
  getWidgetData,
  getWidgetDataSuccess,
  getTopSellingKiosksSuccess,
} from '../actions';

const initialState = {
  isLoading: false,
  widgetData: {
    totalNumberOfProductsSold: 0,
    totalNetIncome: 0,
    averageDailyRevenue: 0,
    peakSalesHour: null,
  },
  topSellingKiosks: [],
};

const reportsReducer = handleActions(
  {
    [getWidgetData]: state => ({
      ...state,
      isLoading: true,
    }),
    [getWidgetDataSuccess]: (state, { payload }) => ({
      ...state,
      widgetData: payload,
      isLoading: false,
    }),
    [getTopSellingKiosksSuccess]: (state, { payload }) => ({
      ...state,
      topSellingKiosks: payload.topSellingKiosks,
    }),
  },
  initialState,
);

export default reportsReducer;
