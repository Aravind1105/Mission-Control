import { createSelector } from "reselect";

export const getApiKeySettingsState = state => state.settings.apiKey;
export const getApiKeyUserState = createSelector(state => state.user.apiKey, apiKey => apiKey.length > 0 ? apiKey[0] : null);
export const getLoadingState = state => state.settings.isLoading;