import { createSelector } from 'reselect';

const getCoreState = state => state.core;

export const getInitialized = createSelector(
  [getCoreState],
  coreState => coreState.initialized,
);

export const getLanguage = createSelector(
  [getCoreState],
  coreState => coreState.language,
);
