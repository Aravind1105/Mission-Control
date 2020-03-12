import { createSelector } from 'reselect';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

const twoHours = 1000 * 60 * 60 * 2;

export const getKiosksState = state => state.kiosks.list;

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

export const getShelvesByKioskId = id =>
  createSelector(getKioskById(id), kiosk => {
    const cells = get(kiosk, 'inventory.loadCells', []);
    const loadCells = sortBy(cells, 'planogramPosition').map(
      ({ products, ...rest }) => ({
        ...rest,
        products,
        availableProducts: products.filter(
          el => el.status === 'in_kiosk_available',
        ).length,
      }),
    );
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

export const getKioskListName = createSelector(getKiosksState, kiosks =>
  kiosks.reduce((prev, { _id, name }) => {
    prev[_id] = name;
    return prev;
  }, {}),
);
