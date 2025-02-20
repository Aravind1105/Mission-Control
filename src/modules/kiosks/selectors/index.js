/* eslint-disable prefer-destructuring */
/* eslint-disable space-infix-ops */
/* eslint-disable radix */
import { createSelector } from 'reselect';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import pick from 'lodash/pick';
import format from 'date-fns/format';
import sortByText from 'lib/sortByText';
import * as R from 'ramda';
import moment from 'moment';
import { cardTypeMessages } from '../../transactions/selectors';
// import differenceInMinutes from 'date-fns/differenceInMinutes';

export const refillMode = {
  MISSION_CONTROL: 'mission_control',
  TABLET: 'tablet',
  AUTOMATIC: 'automatic',
};

const alertMessages = {
  KioskOffline: 'System Offline',
  HighTemp: 'High temperature',
  LowTemp: 'Low temperature',
  DoorLeftOpenPurchase: 'Door left open (Purchase)',
  DoorLeftOpenRefill: 'Door left open (Refill)',
  UnauthAccess: 'Unauthorized Access',
  NoProductsBought: 'Empty Purchase session',
  InvalidScaleWeight: 'Invalid Scales weight',
  NoLeftScalesData: 'Left Scales disconnected',
  NoRightScalesData: 'Right Scales disconnected',
  TabletDisconn: 'Tablet Internet disconnected',
  TabletMqttDisconn: 'Tablet MQTT disconnected',
};

const alertSeverity = {
  high: 'High',
  mid: 'Medium',
  low: 'Low',
};

const activityLogMessages = {
  open: 'Unlocked / Opened',
  closed: 'Closed / Locked',
  door_not_opened: 'Door Not Opened',
  payment_success: 'Payment Success',
  valid_card_read: 'Valid Card Read',
  valid_membercard_read: 'Valid Member Card Read',
  valid_dmayrcard_read: 'Valid Member Card Read',
  invalid_card_read: 'Invalid Card Read',
  payment_failed: 'Payment Failed',
  app_purchase: 'Consumer App Purchase',
  member_purchase: 'Member Card Purchase',
  terminal_purchase: 'Terminal Purchase',
  mc_refill: 'Replenishment (Mission Control)',
  tablet_refill: 'Replenishment (Tablet)',
};

const playlistTypes = {
  main_screen: 'Main Screen',
  explainer: 'Explainer Animation',
  content: 'Image Content',
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

export const getKiosksState = state => state.kiosks.tableList;

export const getKiosksTableState = createSelector(getKiosksState, kiosks =>
  kiosks.map(({ dayIncome, ...el }) => ({
    ...el,
    dayIncome: `${dayIncome ? dayIncome.toFixed(2) : '0.00'}`,
  })),
);

export const getKioskDoorStatus = () => [
  {
    value: '',
    text: 'All Door Status',
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
    (prev, { products, productLine, ...rest }) => {
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
  const cells = shelves.list;
  const filteredCells = cells.filter(
    cell =>
      cell.planogramPosition && cell.planogramPosition.indexOf('A') !== -1,
  );
  const isTwoSides = cells.length !== filteredCells.length;
  const cellIdOptions = [];
  let maxLoadCells = 15;
  if (isTwoSides) {
    maxLoadCells = 30;
  }
  for (let cellId = 1; cellId <= maxLoadCells; cellId++) {
    const cellIdStr = cellId.toString();
    const availIdx = R.findIndex(R.propEq('cellId', cellIdStr))(cells);
    if (availIdx === -1) {
      //if the cellId is not available, add it to the options
      cellIdOptions.push({ value: cellIdStr, label: cellIdStr });
    }
  }
  return cellIdOptions;
});

export const getUsedPlanogramPositions = createSelector(
  getKioskShelves,
  shelves => {
    const cells = shelves.list;
    return cells.map(cell => cell.planogramPosition);
  },
);

export const getKiosksAlerts = createSelector(getKiosksState, kiosks => {
  const filteredTempKiosks = kiosks
    .filter(({ temperature }) => temperature && temperature.value > 7)
    .map(({ _id: id, name }) => ({
      id,
      title: 'Temperature alert',
      message: `Kiosk ${name} temperature is above 7°C!`,
    }));

  const filteredOfflineKiosks = kiosks
    .filter(({ heartbeat }) => {
      if (heartbeat && heartbeat.updated) {
        return Date.now() - new Date(heartbeat.updated) > twoHours;
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

export const getKioskListName = createSelector(getKiosksState, kiosks =>
  kiosks.reduce((prev, { _id, name }) => {
    prev[_id] = name;
    return prev;
  }, {}),
);

export const getKioskOptions = createSelector(
  state => state.kiosks.kiosksList,
  kiosks => {
    const options = kiosks.map(({ _id, name }) => ({
      value: _id,
      text: name,
      key: _id,
    }));
    // sort options based on the alphabetical order of the kiosk names
    const sortByKioskNameCaseInsensitive = R.sortBy(
      R.compose(R.toLower, R.prop('text')),
    );
    return [
      { value: '', text: 'All Kiosks', key: '' },
      ...sortByKioskNameCaseInsensitive(options),
    ];
  },
);

export const getKioskOptionsForTableDropdown = createSelector(
  state => state.kiosks.kiosksList,
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

/**
 * Selector for Organization Dropdown*.
 */
export const getOrganizationOptionsForTableDropdown = createSelector(
  state => state.kiosks.orgsList,
  organization => {
    // let newArr = [{ value: '', text: 'All Organizations', key: '' }];
    // let test = organization.map(item => ({
    //   id: item._id,
    //   name: item.name,
    // }));
    // var setObj = new Set();
    // var result = test.reduce((acc, item) => {
    //   if (!setObj.has(item.id)) {
    //     setObj.add(item.id, item);
    //     acc.push(item);
    //   }
    //   return acc;
    // }, []);

    // result.forEach(item => {
    //   const Item = {
    //     value: item.id,
    //     text: item.name,
    //     key: item.id,
    //   };
    //   newArr.push(Item);
    // });
    // return newArr;
    const options = organization.map(({ _id, name }) => ({
      value: _id,
      text: name,
      key: _id,
    }));
    // sort options based on the alphabetical order of the org names
    const sortByOrgNameCaseInsensitive = R.sortBy(
      R.compose(R.toLower, R.prop('text')),
    );
    return [
      { value: '', text: 'All Organizations', key: '' },
      ...sortByOrgNameCaseInsensitive(options),
    ];
  },
);

export const kioskInitialValues = {
  name: '',
  serialNumber: '',
  notes: '',
  orgId: '',
  locationName: '',
  locationLine1: '',
  locationLine2: '',
  locationPostalCode: '',
  locationCity: '',
  locationState: '',
  locationCountry: '',
  pin: '',
  technicianPin: '',
};

export const getKioskInitValues = createSelector(getKioskSingle, kiosk => {
  return kiosk
    ? {
        id: kiosk._id,
        ...pick(kiosk, ['name', 'serialNumber', 'pin']),
        notes: get(kiosk, 'notes', '') || '',
        orgId: kiosk.orgId,
        locationName: get(kiosk.location.address, 'name', '') || '',
        locationLine1: get(kiosk.location.address, 'line1', '') || '',
        locationLine2: get(kiosk.location.address, 'line2', '') || '',
        locationPostalCode: get(kiosk.location.address, 'postalCode', '') || '',
        locationCity: get(kiosk.location.address, 'city', '') || '',
        locationState: get(kiosk.location.address, 'state', '') || '',
        locationCountry: get(kiosk.location.address, 'country', '') || '',
        technicianPin: get(kiosk.controller, 'technicianPin', '') || '',
        pin: get(kiosk, 'pin', '') || '',
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
  pin: '',
  technicianPin: '',
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
        technicianPin: get(kiosk.controller, 'technicianPin', '') || '',
        ...pick(kiosk, 'pin'),
      }
    : kioskInitialProperties;
});
export const orgInitialProperties = {
  name: '',
  slug: '',
  appleId: '',
};

export const getOrgIdFromKiosk = createSelector(getKioskSingle, kiosk =>
  kiosk ? kiosk.orgId : null,
);

export const getOrgData = state => {
  return state.kiosks.org
    ? {
        name: get(state.kiosks.org, 'name', '') || '',
        slug: get(state.kiosks.org, 'slug', '') || '',
        appleId: get(state.kiosks.org, 'appleId', '') || '',
      }
    : orgInitialProperties;
};

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

export const getActivityLogsScaleName = (kiosk, scales) => {
  const cells = get(kiosk, 'inventory.loadCells', []);
  let filteredData = [];
  scales &&
    scales.filter(function(scale) {
      return cells.filter(function(cell) {
        if (scale.id === cell.cellId && scale.weight !== 0) {
          filteredData.push({
            id: scale.id,
            weight: scale.weight,
            name: cell.productLine.name,
          });
        }
      });
    });
  return filteredData;
};

export const getActivityLogsState = createSelector(
  getActivityLogs,
  state => state,
  (log, state) => {
    if (log) {
      const logs = log.map(actLog => {
        const date = format(new Date(actLog.created), 'dd-MM-yyyy HH:mm:ss');
        return {
          created: date,
          event: {
            type:
              actLog.type !== 'status'
                ? actLog.type === 'refill' && actLog.payload.user_id
                  ? activityLogMessages['mc_refill']
                  : actLog.type === 'refill' && !actLog.payload.user_id
                  ? activityLogMessages['tablet_refill']
                  : activityLogMessages[actLog.type]
                : null,
            alertType: activityLogMessages[actLog.payload.message?.alert_type],
            sessionId: actLog.payload.session_id,
            doorStatus:
              activityLogMessages[actLog.payload.message?.door_status],
            touchedScales: getActivityLogsScaleName(
              state.kiosks.kiosk,
              actLog.payload.message?.touchedScales,
            ),
            scales: getActivityLogsScaleName(
              state.kiosks.kiosk,
              actLog.payload.message?.scales,
            ),
            cardDetails: {
              paymentTerminal:
                activityLogMessages[
                  actLog.payload.message?.card_details?.payment_terminal
                ],
              cardName:
                cardTypeMessages[
                  actLog.payload.message?.card_details?.zvtMessage?.card_name
                ] ||
                actLog.payload.message?.card_details?.zvtMessage?.card_name,
              cardId: actLog.payload.message?.card_details?.cardId,
            },
            userId: actLog.payload.user_id,
            userName: actLog.payload.user_name,
            sessionId: actLog.payload.session_id,
          },
        };
      });
      return logs;
    }
  },
);

export const getTemperatureLogsState = state => state.kiosks.temperatureLogs;

export const getGridTempratureTableState = createSelector(
  getTemperatureLogsState,

  TempLogs => {
    let newArr = [];
    TempLogs.forEach(({ updated, payload }) => {
      const Item = {
        time: updated,
        timeXaxis: moment(updated).format('MMM D'),
        Sensor1: payload.message.sensors[0]
          ? payload.message.sensors[0].temperature / 100
          : null,
        Sensor2: payload.message.sensors[1]
          ? payload.message.sensors[1].temperature / 100
          : null,
        Sensor3: payload.message.sensors[2]
          ? payload.message.sensors[2].temperature / 100
          : null,
        Sensor4: payload.message.sensors[3]
          ? payload.message.sensors[3].temperature / 100
          : null,
      };
      newArr.push(Item);
    });
    return newArr;
  },
);

export const getContentPlaylist = createSelector(getKioskSingle, kiosk => {
  const playListData =
    kiosk &&
    kiosk.controller.playList.map((data, index) => {
      return {
        id: data._id,
        type:
          data.type === 'content'
            ? playlistTypes[data.type] + ` ${index - 1}`
            : playlistTypes[data.type],
        imgData: {
          uri: data.uri,
          name: data.name,
        },
        order: data.order,
        duration: data.duration,
        isEditable: data.type.indexOf('main_screen') === -1 ? true : false,
        isDeletable:
          data.type.indexOf('main_screen') === -1 &&
          data.type.indexOf('explainer') === -1
            ? true
            : false,
        isEnabled: data.enabled,
      };
    });
  return playListData;
});

export const getPaginationState = state => state.kiosks.pagination;

export const getSelectedKiosksState = createSelector(
  getPaginationState,
  pagination => pagination.kiosk,
);

export const getAllSerialNumbersState = state => state.kiosks.serialNumbers;
