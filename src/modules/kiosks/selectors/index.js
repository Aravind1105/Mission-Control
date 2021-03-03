/* eslint-disable prefer-destructuring */
/* eslint-disable space-infix-ops */
/* eslint-disable radix */
import { createSelector } from 'reselect';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import pick from 'lodash/pick';
import format from 'date-fns/format';
import sortByText from 'lib/sortByText';
// import differenceInMinutes from 'date-fns/differenceInMinutes';

const alertMessages = {
  KioskOffline: 'System Offline',
  DoorOpen: 'Door open',
  HighTemp: 'High temperature',
  LowTemp: 'Low temperature',
  DoorLeftOpenPurchase: 'Door left open (Purchase)',
  DoorLeftOpenRefill: 'Door left open (Refill)',
  UnauthAccess: 'Unauthorized Access',
  TabletDisconn: 'Tablet Disconnected',
};

const alertSeverity = {
  high: 'High',
  mid: 'Medium',
  low: 'Low',
};

const activityLogMessages = {
  open: 'Opened',
  closed: 'Closed',
  payment_success: 'Payment Success',
  valid_card_read: 'Valid Card Read',
  valid_membercard_read: 'Valid MemberCard Read',
  invalid_card_read: 'Invalid Card Read',
  payment_failed: 'Payment Failed',
};

const doorStatus = { open: 'open', closed: 'closed', unknown: 'unknown' };

export const getAlertsOptions = () => [
  { value: '', text: 'All Alerts' },
  ...Object.keys(alertMessages).map(alert => ({
    value: alert,
    text: alertMessages[alert],
  })),
];

const twoHours = 1000 * 60 * 60 * 2;

export const getKiosksState = state => state.kiosks.list;

export const getKiosksSerialNumbers = createSelector(getKiosksState, kiosks => {
  return kiosks.map(kiosk => get(kiosk, 'serialNumber', []));
});
export const getKiosksTableState = state =>
  state.kiosks.tableList.map(({ dayIncome, ...el }) => ({
    ...el,
    dayIncome: `${dayIncome ? dayIncome.toFixed(2) : '0.00'}`,
  }));

export const getKioskDoorStatus = () => [
  {
    value: '',
    text: 'Door Status',
  },
  ...Object.keys(doorStatus).map(status => ({
    value: status,
    text: doorStatus[status],
  })),
];

export const getKiosksNetworkStatus = createSelector(
  //!LIV-2285
  getKiosksState,
  kiosks => {
    let networkStates = [],
      temp = [];
    // const netStatus = kiosks.reduce((prev,curr,i) => {
    // let text = 'Offline';
    // const dif = differenceInMinutes(new Date(), new Date(curr.temperature.updated));
    // if(dif <= 60){
    //   text = 'Online';
    // }
    // let time = parseInt(dif / 60);
    // if(time < 24) {
    //   text += ` > ${time} ${time === 1 ? 'hour' : 'hours'}`;
    // }else {
    //   time = parseInt(time / 24);
    //   text += ` > ${time} ${time === 1 ? 'day' : 'days'}`;
    // }
    // if(!temp.includes(text)){
    //   temp.push(text);
    //   temp.sort();
    // networkStates.push({
    //   value: text,
    //   text: text,
    //   key: i
    // });
    // }
    //   return prev;
    // },[]);

    networkStates.push(
      { value: 'Online', text: 'Online', key: 0 },
      { value: 'Offline', text: 'Offline', key: 1 },
    );
    networkStates.unshift({
      value: 'All Network States',
      text: 'All Network States',
      key: 'states',
    });
    return networkStates;
  },
);

export const getAlmostEmptyKiosks = state => state.kiosks.almostEmptyKiosks;
export const getAlmostEmptyKiosksTotal = state => state.kiosks.totalEmptyKiosks;

export const getKiosksAlertsState = state => state.kiosks.alerts;

export const getTotalAlerts = state => state.kiosks.totalAlerts;

export const getKioskSingle = state => state.kiosks.kiosk;

export const getKioskById = id =>
  createSelector(getKiosksState, kiosksState =>
    kiosksState.find(kiosk => kiosk._id === id),
  );

export const getKioskShelves = createSelector(getKioskSingle, kiosk => {
  const cells = get(kiosk, 'inventory.loadCells', []);
  const loadCells = sortBy(cells, 'productLine.name').reduce(
    (prev, { products, productLine, isActive, ...rest }) => {
      const totalProducts = products.length;
      const totalPrice = totalProducts * productLine.price;
      prev.list.push({
        ...rest,
        productLine: {
          ...productLine,
          price: productLine.price && productLine.price.toFixed(2),
        },
        totalProducts,
        totalPrice,
        isActive,
      });
      prev.total += totalPrice;

      return prev;
    },
    { list: [], total: 0 },
  );
  loadCells.total = Number(loadCells.total).toFixed(2);
  return loadCells;
});

export const getCellIdOptions = createSelector(getKioskShelves, shelves => {
  const cellIdOptions = shelves.list
    .filter(loadCell => loadCell.isActive === false)
    .map(loadCell => ({
      value: loadCell.cellId,
      label: loadCell.cellId,
    }));
  // cellIdOptions.push({
  //   value: 'None',
  //   label: 'None',
  // });
  return cellIdOptions;
});

export const getKiosksAlerts = createSelector(getKiosksState, kiosks => {
  const filteredTempKiosks = kiosks
    .filter(({ temperature }) => temperature && temperature.value > 7)
    .map(({ _id: id, name }) => ({
      id,
      title: 'Temperature alert',
      message: `Kiosk ${name} temperature is above 7°C!`,
    }));

  const filteredOfflineKiosks = kiosks
    .filter(({ temperature }) => {
      if (temperature && temperature.updated) {
        return Date.now() - new Date(temperature.updated) > twoHours;
      }
      return false;
    })
    .map(({ _id: id, name }) => ({
      id: `off_${id}`,
      title: 'Offline alert',
      message: `Kiosk ${name} offline over 2 hours!`,
    }));

  return [...filteredTempKiosks, ...filteredOfflineKiosks];
});

export const getKiosksAlertsForTable = createSelector(
  [getKiosksAlertsState],
  alerts =>
    alerts.map(alert => ({
      ...alert,
      startDate: format(new Date(alert.startDate), 'dd-MM-yyyy HH:mm:ss'),
      type: alertMessages[alert.type],
      severity: alertSeverity[alert.severity],
      status: alert.status,
    })),
);

export const getAlmostEmptyKiosksForTable = createSelector(
  [getAlmostEmptyKiosks],
  kiosks => {
    if (kiosks && kiosks.length > 0) {
      return kiosks.map(kiosk => ({
        kioskId: get(kiosk, '_id', undefined),
        product: get(kiosk, 'inventory.loadCells.productLine.name', 'unknown'),
        scale: get(kiosk, 'inventory.loadCells.cellId', 'unknown'),
        amount: get(kiosk, 'productsAmount', 0),
        kiosk: get(kiosk, 'name', 'unknown'),
      }));
    }
    return [];
  },
);

export const getKiosksAlertsDashboard = createSelector(
  getKiosksState,
  kiosks => {
    const filteredTempKiosks = kiosks.reduce(
      (prev, { _id: id, name, temperature, doorStatus }) => {
        const temp = [];

        if (temperature && temperature.value >= 7) {
          const date = temperature
            ? Math.round((Date.now() - new Date(temperature.updated)) / 3600000)
            : '';
          temp.push({
            id,
            name,
            date,
            message: 'Temperature high',
            status: 'New',
          });
        }
        if (doorStatus === 'open') {
          temp.push({
            id,
            name,
            date: '',
            message: 'Door left open',
            status: 'New',
          });
        }

        return prev.concat(temp);
      },
      [],
    );

    return filteredTempKiosks;
  },
);

export const getKioskListName = createSelector(getKiosksState, kiosks =>
  kiosks.reduce((prev, { _id, name }) => {
    prev[_id] = name;
    return prev;
  }, {}),
);

export const getKioskOptions = createSelector(getKiosksState, kiosks => [
  { value: '', label: 'All Kiosks' },
  ...kiosks.map(({ _id, name }) => ({
    value: _id,
    label: name,
  })),
]);

export const getKioskOptionsForTableDropdown = createSelector(
  getKiosksState,
  kiosks => {
    const allKiosks = kiosks.map(({ _id, name }) => ({
      value: _id,
      text: name,
      key: _id,
    }));
    const sortedKiosks = sortByText(allKiosks, 'text');

    return [{ key: 'all', value: '', text: 'All Kiosks' }].concat(sortedKiosks);
  },
);

export const kioskInitialValues = {
  name: '',
  serialNumber: '',
  pin: '',
  notes: '',
  location: {
    address: {
      line1: '',
      line2: '',
      postalCode: '',
      city: '',
      state: '',
      country: '',
    },
  },
};

export const getKioskInitValues = createSelector(getKioskSingle, kiosk => {
  let { __typename, ...address } = get(
    kiosk,
    'location.address',
    kioskInitialValues.location.address,
  );
  address = Object.keys(address).reduce((prev, key) => {
    if (address[key] !== null) {
      prev[key] = address[key];
    }
    return prev;
  }, {});

  return kiosk
    ? {
        id: kiosk._id,
        ...pick(kiosk, ['name', 'serialNumber', 'pin']),
        notes: get(kiosk, 'notes', '') || '',
        orgId: kiosk.orgId,
        location: {
          address: {
            ...kioskInitialValues.location.address,
            ...address,
          },
        },
      }
    : kioskInitialValues;
});

export const kioskInitialProperties = {
  preAuth: 0,
  supportEmail: '',
  paymentType: '',
  tabletLang: '',
  minimumAge: '',
  memberCardEnabled: '',
  serviceCheckEnabled: '',
  serviceCheckStartTime: 0,
  serviceCheckEndTime: 0,
};

export const getKioskProperties = createSelector(getKioskSingle, kiosk => {
  return kiosk && kiosk.controller
    ? {
        id: kiosk._id,
        preAuth: kiosk.controller.preAuth.toString(),
        supportEmail: get(kiosk.ownerOrganization.support, 'email', '') || '',
        paymentType: get(kiosk.controller, 'paymentType', '') || '',
        memberCardEnabled: get(kiosk.controller, 'memberCardEnabled', false),
        tabletLang: get(kiosk.controller, 'tabletLang', '') || '',
        minimumAge: get(kiosk.controller, 'minimumAge', '') || '0',
        serviceCheckEnabled:
          get(kiosk.controller.serviceCheck, 'enabled', '') || false,
        serviceCheckStartTime:
          get(kiosk.controller.serviceCheck, 'startTime', '') || 21,
        serviceCheckEndTime:
          get(kiosk.controller.serviceCheck, 'endTime', '') || 6,
      }
    : kioskInitialProperties;
});

export const getOrgIdFromKiosk = createSelector(getKioskSingle, kiosk =>
  kiosk ? kiosk.orgId : null,
);

export const getOrgName = state => state.kiosks.orgName;

export const getProductsByOrdId = state => state.kiosks.productsByOrgId;

export const getProductsDropdownList = (id = '') =>
  createSelector(getProductsByOrdId, products =>
    products
      .map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))
      .filter(el => el.value !== id),
  );

export const getTotalKiosks = state => state.kiosks.total;

export const getTotalActivityLogs = state => state.kiosks.activityLogs.total;

export const getActivityLogs = state => state.kiosks.activityLogs.data;

export const getActivityLogsState = createSelector(getActivityLogs, log => {
  if (log) {
    const logs = log.map(actLog => {
      const date = format(new Date(actLog.created), 'dd-MM-yyyy HH:mm:ss');
      return {
        created: date,
        event: {
          doorStatus: activityLogMessages[actLog.payload.message.door_status],
          touchedScales: actLog.payload.message.touchedScales,
          paymentTerminal:
            activityLogMessages[actLog.payload.message.payment_terminal],
        },
      };
    });
    return logs;
  }
});

export const getTemperatureLogsState = state => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const { temperatureLogs } = state.kiosks;
  const logs = temperatureLogs.sort((a, b) => {
    const aDate = new Date();
    aDate.setMonth(a.month - 1 || 1);
    aDate.setDate(a.day || 1);
    aDate.setFullYear(a.year);

    const bDate = new Date();
    bDate.setMonth(b.month - 1 || 1);
    bDate.setDate(b.day || 1);
    bDate.setFullYear(b.year);

    return aDate > bDate ? 1 : -1;
  });

  let month = -1;
  if (logs.length > 0) {
    month = logs[0].month;
  }
  const isAllMonthsSame = logs.every(log => log.month === month);

  const organizedData = logs.map(log => {
    const date = new Date();
    date.setMonth(log.month - 1);
    date.setDate(log.day || 1);
    date.setFullYear(log.year);
    return {
      avgTemp: parseInt(log.avgTemp),
      minTemp: parseInt(log.minTemp),
      maxTemp: parseInt(log.maxTemp),
      year: log.year,
      month: monthNames[log.month - 1],
      day: isAllMonthsSame
        ? log.day
        : `${monthNames[log.month - 1]}/${log.day}`,
      date: format(date, 'dd-MM-yyyy'),
    };
  });
  return organizedData;
};
