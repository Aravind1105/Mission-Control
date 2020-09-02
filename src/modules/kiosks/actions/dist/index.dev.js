"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemperatureLogsSuccess = exports.getProductLinesByOrgIdSuccess = exports.getOrganizationByIdSuccess = exports.getAlertsGridSuccess = exports.resetKioskSuccess = exports.getKioskSuccess = exports.modifyKioskSuccess = exports.updateKioskById = exports.updateAlmostEmptyKiosks = exports.updateKiosks = exports.getTemperatureLogs = exports.getProductLinesByOrgId = exports.getOrganizationById = exports.getAlertsGrid = exports.getKiosk = exports.modifyKioskLoadCell = exports.modifyKiosk = exports.resetKiosk = exports.getAlmostEmptyKiosks = exports.getAllKiosks = void 0;

var _reduxActions = require("redux-actions");

// Saga actions
var getAllKiosks = (0, _reduxActions.createAction)('@@saga/KIOSK_LOAD');
exports.getAllKiosks = getAllKiosks;
var getAlmostEmptyKiosks = (0, _reduxActions.createAction)('@@saga/ALMOST_EMPTY_KIOSKS_LOAD');
exports.getAlmostEmptyKiosks = getAlmostEmptyKiosks;
var resetKiosk = (0, _reduxActions.createAction)('@@saga/RESET_KIOSK');
exports.resetKiosk = resetKiosk;
var modifyKiosk = (0, _reduxActions.createAction)('@@saga/MODIFY_KIOSK');
exports.modifyKiosk = modifyKiosk;
var modifyKioskLoadCell = (0, _reduxActions.createAction)('@@saga/MODIFY_KIOSK_LOAD_CELL');
exports.modifyKioskLoadCell = modifyKioskLoadCell;
var getKiosk = (0, _reduxActions.createAction)('@@saga/GET_KIOSK');
exports.getKiosk = getKiosk;
var getAlertsGrid = (0, _reduxActions.createAction)('@@saga/GET_ALERTS_GRID');
exports.getAlertsGrid = getAlertsGrid;
var getOrganizationById = (0, _reduxActions.createAction)('@@saga/GET_ORGANIZATION_BY_ID');
exports.getOrganizationById = getOrganizationById;
var getProductLinesByOrgId = (0, _reduxActions.createAction)('@@saga/GET_PRODUCT_LINES_BY_ORG_ID');
exports.getProductLinesByOrgId = getProductLinesByOrgId;
var getTemperatureLogs = (0, _reduxActions.createAction)('@@saga/GET_TEMPERATURE_LOGS'); // State actions

exports.getTemperatureLogs = getTemperatureLogs;
var updateKiosks = (0, _reduxActions.createAction)('@@state/KIOSKS_UPDATE');
exports.updateKiosks = updateKiosks;
var updateAlmostEmptyKiosks = (0, _reduxActions.createAction)('@@saga/ALMOST_EMPTY_KIOSKS_UPDATE');
exports.updateAlmostEmptyKiosks = updateAlmostEmptyKiosks;
var updateKioskById = (0, _reduxActions.createAction)('@@state/UPDATE_BY_ID');
exports.updateKioskById = updateKioskById;
var modifyKioskSuccess = (0, _reduxActions.createAction)('@@state/MODIFY_KIOSK_SUCCESS');
exports.modifyKioskSuccess = modifyKioskSuccess;
var getKioskSuccess = (0, _reduxActions.createAction)('@@state/GET_KIOSK_SUCCESS');
exports.getKioskSuccess = getKioskSuccess;
var resetKioskSuccess = (0, _reduxActions.createAction)('@@state/KIOSK_RESET_SUCCESS');
exports.resetKioskSuccess = resetKioskSuccess;
var getAlertsGridSuccess = (0, _reduxActions.createAction)('@@state/GET_ALERTS_GRID_SUCCESS');
exports.getAlertsGridSuccess = getAlertsGridSuccess;
var getOrganizationByIdSuccess = (0, _reduxActions.createAction)('@@state/GET_ORGANIZATION_BY_ID_SUCCESS');
exports.getOrganizationByIdSuccess = getOrganizationByIdSuccess;
var getProductLinesByOrgIdSuccess = (0, _reduxActions.createAction)('@@state/GET_PRODUCT_LINES_BY_ORG_ID_SUCCESS');
exports.getProductLinesByOrgIdSuccess = getProductLinesByOrgIdSuccess;
var getTemperatureLogsSuccess = (0, _reduxActions.createAction)('@@state/GET_TEMPERATURE_LOGS_SUCCESS');
exports.getTemperatureLogsSuccess = getTemperatureLogsSuccess;