import { createSelector } from 'reselect';

export const getKiosksState = state => state.kiosks;

export const getKioskById = id => createSelector(
  [getKiosksState],
  kiosksState => kiosksState.find((kiosk) => {
    return kiosk._id === id;
  }),
);
