import { handleActions, combineActions } from 'redux-actions';
import { findIndex, propEq, update } from 'ramda';
import {
  loadKiosksSaga,
  updateKiosks,
  updateKioskById,
  getKiosk,
  getKioskSuccess,
  modifyKioskSuccess,
} from '../actions';

const initialState = {
  list: [],
  kiosk: null,
  isKioskLoading: false,
  isLoading: false,
};

export const kiosksReducer = handleActions(
  {
    [loadKiosksSaga]: state => ({
      ...state,
      isLoading: true,
    }),
    [getKiosk]: state => ({
      ...state,
      isKioskLoading: true,
    }),
    [updateKiosks]: (state, { payload }) => ({
      ...state,
      list: payload,
      isLoading: false,
    }),
    [updateKioskById]: (state, { payload }) => {
      const index = findIndex(propEq('_id', payload._id))(state);
      return {
        ...state,
        list: update(index, { ...state.list[index], ...payload }, state),
        isLoading: false,
      };
    },
    [combineActions(getKioskSuccess, modifyKioskSuccess)]: (
      state,
      { payload },
    ) => ({
      ...state,
      kiosk: payload,
      isKioskLoading: false,
    }),
  },
  initialState,
);

export default kiosksReducer;
