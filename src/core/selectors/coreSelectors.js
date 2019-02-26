import { createSelector } from 'reselect';

const getCoreState = state => state.core;

export const getInitialized = createSelector(
  [getCoreState],
  coreState => coreState.initialized,
);
