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
  getOrganizationById,
  getOrganizationByIdSuccess,
  getProductLinesByOrgId,
  getProductLinesByOrgIdSuccess,
  updateAlmostEmptyKiosks,
  getTemperatureLogs,
  getTemperatureLogsSuccess,
  modifyKiosk,
  updateKiosksForTable,
  getAllKiosksForTable,
  getActivityLogs,
  getActivityLogsSuccess,
  updateKioskProps,
  updateKioskPropsSuccess
} from '../actions';

import { createRefill, createRefillSuccess } from '../../transactions/actions';

const initialState = {
  list: [],
  tableList: [],
  kiosk: null,
  isKioskLoading: false,
  isLoading: false,
  alerts: [],
  totalAlerts: 0,
  productsByOrgId: [],
  almostEmptyKiosks: [],
  totalEmptyKiosks: 0,
  temperatureLogs: [],
  activityLogs: []
};

const kiosksReducer = handleActions(
  {
    [combineActions(getAllKiosks, getAllKiosksForTable)]: state => ({
      ...state,
      isLoading: true,
    }),
    [combineActions(getKiosk, resetKiosk)]: state => ({
      ...state,
      isKioskLoading: true,
    }),
    [updateKiosks]: (state, { payload }) => ({
      ...state,
      list: payload.list,
      total: payload.total,
      isLoading: false,
    }),
    [updateKiosksForTable]: (state, { payload }) => ({
      ...state,
      tableList: payload.list,
      total: payload.total,
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
    [combineActions(modifyKiosk, updateKioskProps)]: state => {
      return {
        ...state,
        isKioskLoading: true,
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
    [updateKioskPropsSuccess]: state => {
      return {
        ...state,
        isKioskLoading: false
      }
    },
    [getAlertsGridSuccess]: (state, { payload }) => {
      return {
        ...state,
        alerts: get(payload, 'gridAlerts.data', []),
        totalAlerts: get(payload, 'gridAlerts.total', 0),
      };
    },
    [combineActions(getOrganizationById, getOrganizationByIdSuccess)]: (
      state,
      { payload },
    ) => {
      return {
        ...state,
        ...payload,
      };
    },
    [getProductLinesByOrgId]: state => ({
      ...state,
      isLoading: true,
    }),
    [getProductLinesByOrgIdSuccess]: (state, { payload }) => ({
      ...state,
      ...payload,
      isLoading: false,
    }),
    [updateAlmostEmptyKiosks]: (state, { payload }) => {
      return {
        ...state,
        almostEmptyKiosks: get(payload, 'getAlmostEmptyKiosks.data', []),
        totalEmptyKiosks: get(payload, 'getAlmostEmptyKiosks.total', 0),
      };
    },
    [createRefill]: state => ({
      ...state,
      isLoading: true,
    }),
    [createRefillSuccess]: (state, { payload }) => {
      return {
        ...state,
        kiosk: payload,
        isLoading: false,
      };
    },
    [getTemperatureLogs]: state => ({
      ...state,
      isLoading: true,
    }),
    [getTemperatureLogsSuccess]: (state, { payload }) => ({
      ...state,
      temperatureLogs: payload.temperatureLogs,
      isLoading: false,
    }),
    [getActivityLogs]: state => ({
      ...state,
      isLoading: true,
    }),
    [getActivityLogsSuccess]: (state, { payload }) => ({
      ...state,
      activityLogs: payload.activityLogs,
      isLoading: false,
    }),
  },
  initialState,
);

export default kiosksReducer;
