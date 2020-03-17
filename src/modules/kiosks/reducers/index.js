import { handleActions, combineActions } from 'redux-actions';
import { findIndex, propEq, update } from 'ramda';
import {
  loadKiosksSaga,
  updateKiosks,
  updateKioskById,
  selectKiosk,
  getKiosk,
  getKioskSuccess,
  modifyKioskSuccess,
} from '../actions';

const initialState = {
  list: [],
  kiosk: null,
  kioskIsLoading: false,
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
      kioskIsLoading: true,
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
    [combineActions(selectKiosk, getKioskSuccess, modifyKioskSuccess)]: (
      state,
      { payload },
    ) => ({
      ...state,
      kiosk: payload,
      kioskIsLoading: false,
    }),
  },
  initialState,
);

export default kiosksReducer;
