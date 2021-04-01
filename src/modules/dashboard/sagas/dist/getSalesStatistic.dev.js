'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = saga;

var _effects = require('redux-saga/effects');

var _groupBy = _interopRequireDefault(require('lodash/groupBy'));

var _gqlReports = _interopRequireDefault(require('lib/https/gqlReports'));

var _formatData = require('./formatData');

var _actions = require('../actions');

var _schema = require('../schema');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _marked =
    /*#__PURE__*/
    regeneratorRuntime.mark(handler),
  _marked2 =
    /*#__PURE__*/
    regeneratorRuntime.mark(saga);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var query = {
  daily: _schema.GET_HOURLY_SALES_STATISTIC_QUERY,
  weekly: _schema.GET_DAILY_SALES_STATISTIC_QUERY,
};
var queryGlobal = {
  daily: _schema.GET_DAILY_SALES_BY_KIOSKS,
  weekly: _schema.GET_WEEKLY_SALES_BY_KIOSKS,
}; // TODO: Change daily: 'dailySales' to daily: 'hourlySales' after mock removed

var queryKey = {
  daily: 'hourlySalesByKiosk',
  weekly: 'dailySalesByKiosk',
};
var queryKeyGlobal = {
  weekly: 'dailySales',
  daily: 'hourlySales',
};

function getLastWeek() {
  // computing the first day in last 7 days
  var date = new Date();
  date.setDate(date.getDate() - 6);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0); // week format computation for the last 7 days

  var weekFormat = [];

  for (var i = 0; i < 7; i += 1) {
    var itrDate = new Date(date);
    itrDate.setDate(itrDate.getDate() + i);
    weekFormat.push(_formatData.days[itrDate.getDay()]);
  }

  weekFormat = weekFormat.map(function(elem) {
    return {
      date: elem,
    };
  });
  return {
    lastWeekDate: date,
    lastWeekFormat: weekFormat,
  };
}

function handler(_ref) {
  var _ref$payload,
    kioskId,
    time,
    variables,
    _ref2,
    data,
    products,
    queryName,
    selector,
    weekFormat,
    _getLastWeek,
    lastWeekDate,
    lastWeekFormat,
    formatted,
    res,
    dataArray;

  return regeneratorRuntime.wrap(
    function handler$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            (_ref$payload = _ref.payload),
              (kioskId = _ref$payload.kioskId),
              (time = _ref$payload.time);
            variables = kioskId
              ? {
                  kioskId: kioskId,
                }
              : {};
            _context.prev = 2;
            _context.next = 5;
            return (0, _effects.call)(_gqlReports['default'].query, {
              query: kioskId ? query[time] : queryGlobal[time],
              variables: variables,
            });

          case 5:
            _ref2 = _context.sent;
            data = _ref2.data;
            products = [];
            queryName = kioskId ? queryKey[time] : queryKeyGlobal[time];
            selector = '_id.date';
            /* eslint-disable */

            data[queryName].forEach(function(elem) {
              if (time === 'daily') {
                elem._id.date = elem._id.date.split('T')[1].split(':')[0];
              } else {
                elem._id.dateString = elem._id.date;
                elem._id.date =
                  _formatData.days[new Date(elem._id.date).getDay()];
              }
            });

            if (time === 'weekly') {
              (_getLastWeek = getLastWeek()),
                (lastWeekDate = _getLastWeek.lastWeekDate),
                (lastWeekFormat = _getLastWeek.lastWeekFormat); // filter last 7 days including current date

              data[queryName] = data[queryName].filter(function(elem) {
                return lastWeekDate < new Date(elem._id.dateString);
              }); // sort the dates

              data[queryName] = data[queryName].sort(function(
                firstDate,
                secondDate,
              ) {
                return (
                  new Date(firstDate._id.dateString) -
                  new Date(secondDate._id.dateString)
                );
              }); // week day ordering

              weekFormat = lastWeekFormat;
            }
            /* eslint-enable */

            formatted = (0, _groupBy['default'])(data[queryName], selector);
            res = Object.keys(formatted).map(function(key) {
              var obj = formatted[key].reduce(function(prev, _ref3) {
                var amount = _ref3.amount,
                  _id = _ref3._id;
                var value = Math.round(amount * 100) / 100;
                var kiosk = (_id.kiosk ? _id.kiosk : '') || 'All Kiosk';
                var sum = prev[kiosk] || 0;

                if (!products.includes(kiosk)) {
                  products.push(kiosk);
                }

                var total = (+sum + +value).toFixed(2);
                return _objectSpread(
                  {},
                  prev,
                  _defineProperty({}, kiosk, total),
                );
              }, {});
              return _objectSpread(
                {
                  name: key,
                },
                obj,
              );
            });
            dataArray = (0, _formatData.formatData)(
              res,
              time,
              kioskId,
              weekFormat,
            );
            _context.next = 17;
            return (0, _effects.put)(
              (0, _actions.getSalesStatisticSuccess)({
                statistic: dataArray,
                products: products,
              }),
            );

          case 17:
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context['catch'](2);
            console.log(_context.t0);

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    },
    _marked,
    null,
    [[2, 19]],
  );
}

function saga() {
  return regeneratorRuntime.wrap(function saga$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_actions.getSalesStatistic, handler);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2);
}
