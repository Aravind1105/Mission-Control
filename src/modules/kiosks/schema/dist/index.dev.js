"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET_TEMPERATURE_LOGS = exports.GET_ALMOST_EMPTY_KIOSKS = exports.GET_ALERTS_GRID = exports.KIOSK_RESET_MUTATION = exports.RESET_LOAD_CELL_INVENTORY_MUTATION = exports.LOAD_CELL_CONFIG_MUTATION = exports.UPDATE_KIOSK_MUTATION = exports.CREATE_KIOSK_MUTATION = exports.GET_KIOSK_QUERY = exports.GET_ALL_KIOSKS_GRID_QUERY = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _schema = require("../../products/schema");

var _schema2 = require("../../users/schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n  query getTemperatureEventsByKioskWithResolution($data: TemperatureEventsByKioskWithResolutionInput) {\n    getTemperatureEventsByKioskWithResolution (data: $data) {\n      avgTemp\n      maxTemp\n      minTemp\n      year\n      kiosk\n      year\n      month\n      day\n      hour\n    }\n  }\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  query getAlmostEmptyKiosks(\n    $skip: Int\n    $limit: Int\n    $filter: KioskAlmostEmptyFilter\n  ) {\n    getAlmostEmptyKiosks(skip: $skip, limit: $limit, filter: $filter) {\n      data {\n        _id\n        name\n        orgId\n        productsAmount\n        inventory {\n          loadCells {\n            cellId\n            productLine {\n              ...product\n            }\n          }\n        }\n      }\n      total\n    }\n  }\n  ", "\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  query gridAlerts($data: GridRequest) {\n    gridAlerts(data: $data) {\n      total\n      data {\n        _id\n        orgId\n        type\n        severity\n        status\n        startDate\n        endDate\n        details {\n          ...FragmentKioskOffline\n        }\n      }\n    }\n  }\n  ", "\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  mutation resetKiosk($id: String!) {\n    kioskReset(id: $id) {\n      ...FragmentKiosk\n    }\n  }\n  ", "\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  mutation resetLoadCell(\n    $id: String!\n    $cellId: String!\n    $data: ResetLoadcellAmountInput!\n  ) {\n    resetLoadcellInventory(id: $id, cellId: $cellId, data: $data) {\n      _id\n    }\n  }\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  mutation modifyLoadCells($data: LoadCellsInput!) {\n    configureLoadCells(data: $data) {\n      _id\n    }\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  mutation kioskUpdate($id: String!, $data: KioskInput!) {\n    kioskUpdate(id: $id, data: $data) {\n      ...FragmentKiosk\n    }\n  }\n  ", "\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  mutation kioskCreate($data: KioskInput!) {\n    kioskCreate(data: $data) {\n      ...FragmentKiosk\n    }\n  }\n  ", "\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  query kiosk($id: String!) {\n    getKioskById(id: $id) {\n      ...FragmentKiosk\n    }\n  }\n  ", "\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  query($data: GridRequest){\n    getKiosksGrid(data: $data) {\n      total\n      data {\n        _id\n        name\n        doorStatus\n        temperature {\n          value\n          updated\n        }\n        location {\n          address {\n            name\n            line1\n            line2\n            city\n            state\n            country\n            postalCode\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  fragment FragmentKioskOffline on AlertKioskOffline {\n    kioskId {\n      _id\n      name\n    }\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  fragment FragmentKiosk on Kiosk {\n    _id\n    name\n    doorStatus\n    serialNumber\n    qrcode\n    pin\n    notes\n    orgId\n    temperature {\n      value\n      updated\n    }\n    location {\n      ...LocationForKiosk\n    }\n    ownerOrganization {\n      _id\n      name\n      address {\n        properties {\n          city\n        }\n      }\n    }\n    internet {\n      signalStrength\n    }\n    session {\n      type\n    }\n    inventory {\n      ...InventoryForKiosk\n    }\n  }\n  ", "\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    fragment InventoryForKiosk on Inventory {\n      loadCells {\n        cellId\n        planogramPosition\n        products {\n          _id\n        }\n        priceTag\n        productLine {\n          _id\n          name\n          images\n        }\n      }\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    fragment LocationForKiosk on Location {\n      address {\n        name\n        line1\n        line2\n        postalCode\n        city\n        state\n        country\n      }\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var FragmentLocation = {
  location: (0, _graphqlTag["default"])(_templateObject())
}; // const FragmentKioskAlmostEmptyRow = gql`
//   fragment KioskAlmostEmptyRow on Kiosk {
//   }
// `;

var FragmentInventory = {
  inventory: (0, _graphqlTag["default"])(_templateObject2())
};
var FragmentKioskOnKiosk = (0, _graphqlTag["default"])(_templateObject3(), FragmentLocation.location, FragmentInventory.inventory);
var FragmentKioskOfflineOnKiosk = (0, _graphqlTag["default"])(_templateObject4());
var GET_ALL_KIOSKS_GRID_QUERY = (0, _graphqlTag["default"])(_templateObject5());
exports.GET_ALL_KIOSKS_GRID_QUERY = GET_ALL_KIOSKS_GRID_QUERY;
var GET_KIOSK_QUERY = (0, _graphqlTag["default"])(_templateObject6(), FragmentKioskOnKiosk);
exports.GET_KIOSK_QUERY = GET_KIOSK_QUERY;
var CREATE_KIOSK_MUTATION = (0, _graphqlTag["default"])(_templateObject7(), FragmentKioskOnKiosk);
exports.CREATE_KIOSK_MUTATION = CREATE_KIOSK_MUTATION;
var UPDATE_KIOSK_MUTATION = (0, _graphqlTag["default"])(_templateObject8(), FragmentKioskOnKiosk);
exports.UPDATE_KIOSK_MUTATION = UPDATE_KIOSK_MUTATION;
var LOAD_CELL_CONFIG_MUTATION = (0, _graphqlTag["default"])(_templateObject9());
exports.LOAD_CELL_CONFIG_MUTATION = LOAD_CELL_CONFIG_MUTATION;
var RESET_LOAD_CELL_INVENTORY_MUTATION = (0, _graphqlTag["default"])(_templateObject10());
exports.RESET_LOAD_CELL_INVENTORY_MUTATION = RESET_LOAD_CELL_INVENTORY_MUTATION;
var KIOSK_RESET_MUTATION = (0, _graphqlTag["default"])(_templateObject11(), FragmentKioskOnKiosk);
exports.KIOSK_RESET_MUTATION = KIOSK_RESET_MUTATION;
var GET_ALERTS_GRID = (0, _graphqlTag["default"])(_templateObject12(), FragmentKioskOfflineOnKiosk);
exports.GET_ALERTS_GRID = GET_ALERTS_GRID;
var GET_ALMOST_EMPTY_KIOSKS = (0, _graphqlTag["default"])(_templateObject13(), _schema.productOnProductLine);
exports.GET_ALMOST_EMPTY_KIOSKS = GET_ALMOST_EMPTY_KIOSKS;
var GET_TEMPERATURE_LOGS = (0, _graphqlTag["default"])(_templateObject14());
exports.GET_TEMPERATURE_LOGS = GET_TEMPERATURE_LOGS;