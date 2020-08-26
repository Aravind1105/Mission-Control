"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = saga;

var _effects = require("redux-saga/effects");

var _gqlKiosk = _interopRequireDefault(require("lib/https/gqlKiosk"));

var _schema = require("../schema");

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(handler),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(saga);

function handler(_ref) {
  var payload, _ref2, getTemperatureEventsByKioskWithResolution;

  return regeneratorRuntime.wrap(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_gqlKiosk["default"].query, {
            query: _schema.GET_TEMPERATURE_LOGS,
            variables: {
              kioskId: '5c17a3d963ca649138ec522c',
              from: '2020-01-01',
              to: '2020-08-01',
              limit: 100,
              resolution: 'MONTH'
            }
          });

        case 4:
          _ref2 = _context.sent;
          getTemperatureEventsByKioskWithResolution = _ref2.data.getTemperatureEventsByKioskWithResolution;
          _context.next = 8;
          return (0, _effects.put)((0, _actions.getTemperatureLogsSuccess)({
            temperatureLogs: getTemperatureEventsByKioskWithResolution
          }));

        case 8:
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 10]]);
}

function saga() {
  return regeneratorRuntime.wrap(function saga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(_actions.getTemperatureLogs, handler);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}