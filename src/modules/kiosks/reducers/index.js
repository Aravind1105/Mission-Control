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
  getAlertsGrid,
  getAlertsGridSuccess,
  getOrganizationById,
  getOrganizationByIdSuccess,
  getProductLinesByOrgId,
  getProductLinesByOrgIdSuccess,
  getAlmostEmptyKiosks,
  updateAlmostEmptyKiosks,
  getTemperatureLogs,
  getTemperatureLogsSuccess,
  modifyKiosk,
  updateKiosksForTable,
  getAllKiosksForTable,
  getActivityLogs,
  getActivityLogsSuccess,
  updateKioskProps,
  updateKioskPropsSuccess,
  setPlanogramSwitchStateSuccess,
  deleteLoadCell,
  deleteLoadCellSuccess,
  setPage,
  setPerPage,
  setSort,
  setFilters,
  setSearch,
  setKiosk,
  setOrganization,
  setKioskStatus,
  getKiosksList,
  getKiosksListSuccess,
} from '../actions';

import { createRefill, createRefillSuccess } from '../../transactions/actions';

const initialState = {
  list: [],
  tableList: [],
  kiosk: null,
  isKioskLoading: false,
  isLoading: false,
  currentKioskSide: 'A',
  alerts: [],
  totalAlerts: 0,
  productsByOrgId: [],
  almostEmptyKiosks: [],
  totalEmptyKiosks: 0,
  temperatureLogs: [],
  activityLogs: [],
  kiosksList: [],
  isKiosksListLoading: false,
  pagination: {
    page: 0,
    perPage: 25,
    sort: [
      {
        column: 'name',
        direction: 'ASC',
      },
    ],
    filters: {
      search: '',
      kiosk: [],
      kioskStatus: '',
      organization: '',
    },
    search: '',
    kiosk: [],
    organization: '',
    kioskStatus: '',
  },
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
    [setPlanogramSwitchStateSuccess]: (state, { payload }) => ({
      ...state,
      currentKioskSide: payload.setSide,
    }),
    [combineActions(
      getKioskSuccess,
      modifyKioskSuccess,
      resetKioskSuccess,
      deleteLoadCellSuccess,
    )]: (state, { payload }) => ({
      ...state,
      kiosk: payload,
      isKioskLoading: false,
    }),
    [updateKioskPropsSuccess]: (state, { payload }) => {
      return {
        ...state,
        kiosk: payload,
        isKioskLoading: false,
      };
    },
    [getAlertsGrid]: state => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [getAlertsGridSuccess]: (state, { payload }) => {
      return {
        ...state,
        alerts: get(payload, 'gridAlerts.data', []),
        totalAlerts: get(payload, 'gridAlerts.total', 0),
        isLoading: false,
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
    [getAlmostEmptyKiosks]: state => ({
      ...state,
      isLoading: true,
    }),
    [updateAlmostEmptyKiosks]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
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
    [deleteLoadCell]: state => ({
      ...state,
      isLoading: true,
    }),
    [setPage]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, page: payload },
    }),
    [setPerPage]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, perPage: payload },
    }),
    [setSort]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, sort: payload },
    }),
    [setFilters]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, filters: payload },
    }),
    [setSearch]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, search: payload },
    }),
    [setKiosk]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, kiosk: payload },
    }),
    [setOrganization]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, organization: payload },
    }),
    [setKioskStatus]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, kioskStatus: payload },
    }),
    [getKiosksList]: (state, {}) => ({
      ...state,
      pagination: { ...state, isKiosksListLoading: true },
    }),
    [getKiosksListSuccess]: (state, { payload }) => ({
      ...state,
      kiosksList: payload,
      isKiosksListLoading: false,
    }),
  },
  initialState,
);

export default kiosksReducer;
