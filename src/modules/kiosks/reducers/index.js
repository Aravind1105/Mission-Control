import { handleActions, combineActions } from 'redux-actions';
import { findIndex, propEq, update } from 'ramda';
import get from 'lodash/get';
import {
  getAllKiosks,
  updateKiosks,
  updateKioskById,
  getKiosk,
  getKioskSuccess,
  modifyKioskSuccess,
  resetKiosk,
  resetKioskSuccess,
  getAlertsGridSuccess,
} from '../actions';

const initialState = {
  list: [],
  kiosk: null,
  isKioskLoading: false,
  isLoading: false,
  alerts: [],
  totalAlerts: 0,
};

const kiosksReducer = handleActions(
  {
    [getAllKiosks]: state => ({
      ...state,
      isLoading: true,
    }),
    [combineActions(getKiosk, resetKiosk)]: state => ({
      ...state,
      isKioskLoading: true,
    }),
    [updateKiosks]: (state, { payload }) => ({
      ...state,
      list: payload,
      isLoading: false,
    }),
    [updateKioskById]: (state, { payload }) => {
      const index = findIndex(propEq('_id', payload._id))(state);
      return {
        ...state,
        list: update(index, { ...state.list[index], ...payload }, state),
        isLoading: false,
      };
    },
    [combineActions(getKioskSuccess, modifyKioskSuccess, resetKioskSuccess)]: (
      state,
      { payload },
    ) => ({
      ...state,
      kiosk: payload,
      isKioskLoading: false,
    }),
    [getAlertsGridSuccess]: (state, { payload }) => {
      return {
        ...state,
        alerts: get(payload, 'gridAlerts.data', []),
        totalAlerts: get(payload, 'gridAlerts.total', null),
      };
    },
  },
  initialState,
);

export default kiosksReducer;
