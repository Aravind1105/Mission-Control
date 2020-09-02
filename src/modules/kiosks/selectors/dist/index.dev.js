"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemperatureLogsState = exports.getTotalKiosks = exports.getProductsDropdownList = exports.getProductsByOrdId = exports.getOrgName = exports.getOrgIdFromKiosk = exports.getKioskInitValues = exports.kioskInitialValues = exports.getKioskOptionsForTableDropdown = exports.getKioskOptions = exports.getKioskListName = exports.getKiosksAlertsDashboard = exports.getAlmostEmptyKiosksForTable = exports.getKiosksAlertsForTable = exports.getKiosksAlerts = exports.getKioskShelves = exports.getKioskById = exports.getKioskSingle = exports.getTotalAlerts = exports.getKiosksAlertsState = exports.getAlmostEmptyKiosksTotal = exports.getAlmostEmptyKiosks = exports.getKiosksState = exports.getAlertsOptions = void 0;

var _reselect = require("reselect");

var _get2 = _interopRequireDefault(require("lodash/get"));

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _sortByText = _interopRequireDefault(require("lib/sortByText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var alertMessages = {
  KioskOffline: 'System Offline',
  HighTemp: 'High temperature',
  LowTemp: 'Low temperature',
  TabletDisconn: 'TabletDisconn',
  DoorLeftOpenPurchase: 'Door left open (Purchase)',
  DoorLeftOpenRefill: 'Door left open (Refill)',
  UnauthAccess: 'Unauthorized Access'
};

var getAlertsOptions = function getAlertsOptions() {
  return [{
    value: '',
    text: 'All Alerts'
  }].concat(_toConsumableArray(Object.keys(alertMessages).map(function (alert) {
    return {
      value: alert,
      text: alertMessages[alert]
    };
  })));
};

exports.getAlertsOptions = getAlertsOptions;
var twoHours = 1000 * 60 * 60 * 2;

var getKiosksState = function getKiosksState(state) {
  return state.kiosks.list;
};

exports.getKiosksState = getKiosksState;

var getAlmostEmptyKiosks = function getAlmostEmptyKiosks(state) {
  return state.kiosks.almostEmptyKiosks;
};

exports.getAlmostEmptyKiosks = getAlmostEmptyKiosks;

var getAlmostEmptyKiosksTotal = function getAlmostEmptyKiosksTotal(state) {
  return state.kiosks.totalEmptyKiosks;
};

exports.getAlmostEmptyKiosksTotal = getAlmostEmptyKiosksTotal;

var getKiosksAlertsState = function getKiosksAlertsState(state) {
  return state.kiosks.alerts;
};

exports.getKiosksAlertsState = getKiosksAlertsState;

var getTotalAlerts = function getTotalAlerts(state) {
  return state.kiosks.totalAlerts;
};

exports.getTotalAlerts = getTotalAlerts;

var getKioskSingle = function getKioskSingle(state) {
  return state.kiosks.kiosk;
};

exports.getKioskSingle = getKioskSingle;

var getKioskById = function getKioskById(id) {
  return (0, _reselect.createSelector)(getKiosksState, function (kiosksState) {
    return kiosksState.find(function (kiosk) {
      return kiosk._id === id;
    });
  });
};

exports.getKioskById = getKioskById;
var getKioskShelves = (0, _reselect.createSelector)(getKioskSingle, function (kiosk) {
  var cells = (0, _get2["default"])(kiosk, 'inventory.loadCells', []);
  var loadCells = (0, _sortBy["default"])(cells, 'productLine.name').reduce(function (prev, _ref) {
    var products = _ref.products,
        productLine = _ref.productLine,
        rest = _objectWithoutProperties(_ref, ["products", "productLine"]);

    var totalProducts = products.length;
    var totalPrice = totalProducts * productLine.price;
    prev.list.push(_objectSpread({}, rest, {
      productLine: _objectSpread({}, productLine, {
        price: productLine.price && productLine.price.toFixed(2)
      }),
      totalProducts: totalProducts,
      totalPrice: totalPrice
    }));
    prev.total += totalPrice;
    return prev;
  }, {
    list: [],
    total: 0
  });
  loadCells.total = Number(loadCells.total).toFixed(2);
  return loadCells;
});
exports.getKioskShelves = getKioskShelves;
var getKiosksAlerts = (0, _reselect.createSelector)(getKiosksState, function (kiosks) {
  var filteredTempKiosks = kiosks.filter(function (_ref2) {
    var temperature = _ref2.temperature;
    return temperature && temperature.value > 7;
  }).map(function (_ref3) {
    var id = _ref3._id,
        name = _ref3.name;
    return {
      id: id,
      title: 'Temperature alert',
      message: "Kiosk ".concat(name, " temperature is above 7\xB0C!")
    };
  });
  var filteredOfflineKiosks = kiosks.filter(function (_ref4) {
    var temperature = _ref4.temperature;

    if (temperature && temperature.updated) {
      return Date.now() - new Date(temperature.updated) > twoHours;
    }

    return false;
  }).map(function (_ref5) {
    var id = _ref5._id,
        name = _ref5.name;
    return {
      id: "off_".concat(id),
      title: 'Offline alert',
      message: "Kiosk ".concat(name, " offline over 2 hours!")
    };
  });
  return [].concat(_toConsumableArray(filteredTempKiosks), _toConsumableArray(filteredOfflineKiosks));
});
exports.getKiosksAlerts = getKiosksAlerts;
var getKiosksAlertsForTable = (0, _reselect.createSelector)([getKiosksAlertsState], function (alerts) {
  return alerts.map(function (alert) {
    return _objectSpread({}, alert, {
      startDate: (0, _format["default"])(new Date(alert.startDate), 'HH:mm:ss, dd-MM-yyyy'),
      type: alertMessages[alert.type]
    });
  });
});
exports.getKiosksAlertsForTable = getKiosksAlertsForTable;
var getAlmostEmptyKiosksForTable = (0, _reselect.createSelector)([getAlmostEmptyKiosks], function (kiosks) {
  if (kiosks && kiosks.length > 0) {
    return kiosks.map(function (kiosk) {
      return {
        product: (0, _get2["default"])(kiosk, 'inventory.loadCells.productLine.name', 'unknown'),
        scale: (0, _get2["default"])(kiosk, 'inventory.loadCells.cellId', 'unknown'),
        amount: (0, _get2["default"])(kiosk, 'productsAmount', 0),
        kiosk: (0, _get2["default"])(kiosk, 'name', 'unknown')
      };
    });
  }

  return [];
});
exports.getAlmostEmptyKiosksForTable = getAlmostEmptyKiosksForTable;
var getKiosksAlertsDashboard = (0, _reselect.createSelector)(getKiosksState, function (kiosks) {
  var filteredTempKiosks = kiosks.reduce(function (prev, _ref6) {
    var id = _ref6._id,
        name = _ref6.name,
        temperature = _ref6.temperature,
        doorStatus = _ref6.doorStatus;
    var temp = [];

    if (temperature && temperature.value >= 7) {
      var date = temperature ? Math.round((Date.now() - new Date(temperature.updated)) / 3600000) : '';
      temp.push({
        id: id,
        name: name,
        date: date,
        message: 'Temperature high',
        status: 'New'
      });
    }

    if (doorStatus === 'open') {
      temp.push({
        id: id,
        name: name,
        date: '',
        message: 'Door left open',
        status: 'New'
      });
    }

    return prev.concat(temp);
  }, []);
  return filteredTempKiosks;
});
exports.getKiosksAlertsDashboard = getKiosksAlertsDashboard;
var getKioskListName = (0, _reselect.createSelector)(getKiosksState, function (kiosks) {
  return kiosks.reduce(function (prev, _ref7) {
    var _id = _ref7._id,
        name = _ref7.name;
    prev[_id] = name;
    return prev;
  }, {});
});
exports.getKioskListName = getKioskListName;
var getKioskOptions = (0, _reselect.createSelector)(getKiosksState, function (kiosks) {
  return [{
    value: '',
    label: 'All Fridges'
  }].concat(_toConsumableArray(kiosks.map(function (_ref8) {
    var _id = _ref8._id,
        name = _ref8.name;
    return {
      value: _id,
      label: name
    };
  })));
});
exports.getKioskOptions = getKioskOptions;
var getKioskOptionsForTableDropdown = (0, _reselect.createSelector)(getKiosksState, function (kiosks) {
  var allKiosks = kiosks.map(function (_ref9) {
    var _id = _ref9._id,
        name = _ref9.name;
    return {
      value: _id,
      text: name,
      key: _id
    };
  });
  var sortedKiosks = (0, _sortByText["default"])(allKiosks, 'text');
  return [{
    key: 'all',
    value: '',
    text: 'All Fridges'
  }].concat(sortedKiosks);
});
exports.getKioskOptionsForTableDropdown = getKioskOptionsForTableDropdown;
var kioskInitialValues = {
  name: '',
  serialNumber: '',
  pin: '',
  location: {
    address: {
      line1: '',
      line2: '',
      postalCode: '',
      city: '',
      state: '',
      country: ''
    }
  }
};
exports.kioskInitialValues = kioskInitialValues;
var getKioskInitValues = (0, _reselect.createSelector)(getKioskSingle, function (kiosk) {
  var _get = (0, _get2["default"])(kiosk, 'location.address', kioskInitialValues.location.address),
      __typename = _get.__typename,
      address = _objectWithoutProperties(_get, ["__typename"]);

  address = Object.keys(address).reduce(function (prev, key) {
    if (address[key] !== null) {
      prev[key] = address[key];
    }

    return prev;
  }, {});
  return kiosk ? _objectSpread({
    id: kiosk._id
  }, (0, _pick["default"])(kiosk, ['name', 'serialNumber', 'pin', 'notes']), {
    orgId: kiosk.orgId,
    location: {
      address: _objectSpread({}, kioskInitialValues.location.address, {}, address)
    }
  }) : kioskInitialValues;
});
exports.getKioskInitValues = getKioskInitValues;
var getOrgIdFromKiosk = (0, _reselect.createSelector)(getKioskSingle, function (kiosk) {
  return kiosk ? kiosk.orgId : null;
});
exports.getOrgIdFromKiosk = getOrgIdFromKiosk;

var getOrgName = function getOrgName(state) {
  return state.kiosks.orgName;
};

exports.getOrgName = getOrgName;

var getProductsByOrdId = function getProductsByOrdId(state) {
  return state.kiosks.productsByOrgId;
};

exports.getProductsByOrdId = getProductsByOrdId;

var getProductsDropdownList = function getProductsDropdownList() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (0, _reselect.createSelector)(getProductsByOrdId, function (products) {
    return products.map(function (_ref10) {
      var _id = _ref10._id,
          name = _ref10.name;
      return {
        value: _id,
        label: name
      };
    }).filter(function (el) {
      return el.value !== id;
    });
  });
};

exports.getProductsDropdownList = getProductsDropdownList;

var getTotalKiosks = function getTotalKiosks(state) {
  return state.kiosks.total;
};

exports.getTotalKiosks = getTotalKiosks;

var getTemperatureLogsState = function getTemperatureLogsState(state) {
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var temperatureLogs = state.kiosks.temperatureLogs;
  var logs = temperatureLogs.sort(function (a, b) {
    var aDate = new Date();
    aDate.setMonth(a.month || 1);
    aDate.setDate(a.day || 1);
    aDate.setFullYear(a.year);
    var bDate = new Date();
    bDate.setMonth(b.month || 1);
    bDate.setDate(b.day || 1);
    bDate.setFullYear(b.year);
    return aDate > bDate ? 1 : -1;
  });
  var month = -1;

  if (logs.length > 0) {
    month = logs[0].month;
  }

  var isAllMonthsSame = logs.every(function (log) {
    return log.month === month;
  });
  return logs.map(function (log) {
    var date = new Date();
    date.setMonth(log.month || 1);
    date.setDate(log.day || 1);
    date.setFullYear(log.year);
    return {
      avgTemp: parseInt(log.avgTemp),
      minTemp: parseInt(log.minTemp),
      maxTemp: parseInt(log.maxTemp),
      year: log.year,
      month: monthNames[log.month],
      day: isAllMonthsSame ? log.day : "".concat(monthNames[log.month], "/").concat(log.day),
      date: (0, _format["default"])(date, 'dd-MM-yyyy')
    };
  });
};

exports.getTemperatureLogsState = getTemperatureLogsState;