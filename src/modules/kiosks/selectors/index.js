import { createSelector } from 'reselect';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import pick from 'lodash/pick';
import format from 'date-fns/format';

const alertMessages = {
  KioskOffline: 'System Offline',
};

const twoHours = 1000 * 60 * 60 * 2;

export const getKiosksState = state => state.kiosks.list;

export const getKiosksAlertsState = state => state.kiosks.alerts;

export const getTotalAlerts = state => state.kiosks.totalAlerts;

export const getKioskSingle = state => state.kiosks.kiosk;

export const getKiosksWithSearch = searchText =>
  createSelector(getKiosksState, kiosks => {
    const search = searchText.trim().toLowerCase();

    return search
      ? kiosks.filter(({ name }) => name.toLowerCase().includes(search))
      : kiosks;
  });

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
          price: productLine.price.toFixed(2),
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
  alerts => {
    return alerts.map(alert => {
      return {
        date: format(new Date(alert.startDate), 'HH:mm:ss, dd-MM-yyyy'),
        alert: alertMessages[alert.type],
        kiosk: '',
      };
    });
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
  { value: '', label: 'All Fridges' },
  ...kiosks.map(({ _id, name }) => ({
    value: _id,
    label: name,
  })),
]);

export const getKioskOptionsForTableDropdown = createSelector(
  getKiosksState,
  kiosks => [
    { key: 'all', value: '', text: 'All Fridges' },
    ...kiosks.map(({ _id, name }) => ({
      value: _id,
      text: name,
      key: _id,
    })),
  ],
);

export const kioskInitialValues = {
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
