"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reduxActions = require("redux-actions");

var _ramda = require("ramda");

var _get = _interopRequireDefault(require("lodash/get"));

var _actions = require("../actions");

var _actions2 = require("../../transactions/actions");

var _handleActions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  list: [],
  kiosk: null,
  isKioskLoading: false,
  isLoading: false,
  alerts: [],
  totalAlerts: 0,
  productsByOrgId: [],
  almostEmptyKiosks: [],
  totalEmptyKiosks: 0,
  temperatureLogs: []
};
var kiosksReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.getAllKiosks, function (state) {
  return _objectSpread({}, state, {
    isLoading: true
  });
}), _defineProperty(_handleActions, (0, _reduxActions.combineActions)(_actions.getKiosk, _actions.resetKiosk), function (state) {
  return _objectSpread({}, state, {
    isKioskLoading: true
  });
}), _defineProperty(_handleActions, _actions.updateKiosks, function (state, _ref) {
  var payload = _ref.payload;
  return _objectSpread({}, state, {
    list: payload.list,
    total: payload.total,
    isLoading: false
  });
}), _defineProperty(_handleActions, _actions.updateKioskById, function (state, _ref2) {
  var payload = _ref2.payload;
  var index = (0, _ramda.findIndex)((0, _ramda.propEq)('_id', payload._id))(state);
  return _objectSpread({}, state, {
    list: (0, _ramda.update)(index, _objectSpread({}, state.list[index], {}, payload), state),
    isLoading: false
  });
}), _defineProperty(_handleActions, (0, _reduxActions.combineActions)(_actions.getKioskSuccess, _actions.modifyKioskSuccess, _actions.resetKioskSuccess), function (state, _ref3) {
  var payload = _ref3.payload;
  return _objectSpread({}, state, {
    kiosk: payload,
    isKioskLoading: false
  });
}), _defineProperty(_handleActions, _actions.getAlertsGridSuccess, function (state, _ref4) {
  var payload = _ref4.payload;
  return _objectSpread({}, state, {
    alerts: (0, _get["default"])(payload, 'gridAlerts.data', []),
    totalAlerts: (0, _get["default"])(payload, 'gridAlerts.total', 0)
  });
}), _defineProperty(_handleActions, (0, _reduxActions.combineActions)(_actions.getOrganizationById, _actions.getOrganizationByIdSuccess), function (state, _ref5) {
  var payload = _ref5.payload;
  return _objectSpread({}, state, {}, payload);
}), _defineProperty(_handleActions, _actions.getProductLinesByOrgId, function (state) {
  return _objectSpread({}, state, {
    isLoading: true
  });
}), _defineProperty(_handleActions, _actions.getProductLinesByOrgIdSuccess, function (state, _ref6) {
  var payload = _ref6.payload;
  return _objectSpread({}, state, {}, payload, {
    isLoading: false
  });
}), _defineProperty(_handleActions, _actions.updateAlmostEmptyKiosks, function (state, _ref7) {
  var payload = _ref7.payload;
  return _objectSpread({}, state, {
    almostEmptyKiosks: (0, _get["default"])(payload, 'getAlmostEmptyKiosks.data', []),
    totalEmptyKiosks: (0, _get["default"])(payload, 'getAlmostEmptyKiosks.total', 0)
  });
}), _defineProperty(_handleActions, _actions2.createRefill, function (state) {
  return _objectSpread({}, state, {
    isLoading: true
  });
}), _defineProperty(_handleActions, _actions2.createRefillSuccess, function (state, _ref8) {
  var payload = _ref8.payload;
  return _objectSpread({}, state, {
    kiosk: payload,
    isLoading: false
  });
}), _defineProperty(_handleActions, _actions.getTemperatureLogs, function (state) {
  return _objectSpread({}, state, {
    isLoading: true
  });
}), _defineProperty(_handleActions, _actions.getTemperatureLogsSuccess, function (state, _ref9) {
  var payload = _ref9.payload;
  return _objectSpread({}, state, {
    temperatureLogs: payload.temperatureLogs,
    isLoading: false
  });
}), _handleActions), initialState);
var _default = kiosksReducer;
exports["default"] = _default;