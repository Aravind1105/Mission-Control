"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = kiosksSaga;

var _effects = require("redux-saga/effects");

var _resetKiosk = _interopRequireDefault(require("./resetKiosk"));

var _getAllKiosks = _interopRequireDefault(require("./getAllKiosks"));

var _modifyLoadCell = _interopRequireDefault(require("./modifyLoadCell"));

var _modifyKiosk = _interopRequireDefault(require("./modifyKiosk"));

var _getKiosk = _interopRequireDefault(require("./getKiosk"));

var _getAlertsGrid = _interopRequireDefault(require("./getAlertsGrid"));

var _getOrgName = _interopRequireDefault(require("./getOrgName"));

var _getProductLinesByOrgId = _interopRequireDefault(require("./getProductLinesByOrgId"));

var _getAlmostEmptyKiosks = _interopRequireDefault(require("./getAlmostEmptyKiosks"));

var _getTemperatureLogs = _interopRequireDefault(require("./getTemperatureLogs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(kiosksSaga);

function kiosksSaga() {
  return regeneratorRuntime.wrap(function kiosksSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.all)([(0, _effects.fork)(_getAllKiosks["default"]), (0, _effects.fork)(_resetKiosk["default"]), (0, _effects.fork)(_modifyLoadCell["default"]), (0, _effects.fork)(_modifyKiosk["default"]), (0, _effects.fork)(_getKiosk["default"]), (0, _effects.fork)(_getAlertsGrid["default"]), (0, _effects.fork)(_getOrgName["default"]), (0, _effects.fork)(_getProductLinesByOrgId["default"]), (0, _effects.fork)(_getAlmostEmptyKiosks["default"]), (0, _effects.fork)(_getTemperatureLogs["default"])]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}