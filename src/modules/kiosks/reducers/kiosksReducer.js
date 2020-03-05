import { handleActions } from 'redux-actions';
import { findIndex, propEq, update } from 'ramda';
import { loadKiosksSaga, updateKiosks, updateKioskById } from '../actions';

const initialState = {
  list: [],
  isLoading: false,
};

export const kiosksReducer = handleActions(
  {
    [loadKiosksSaga]: state => ({
      ...state,
      isLoading: true,
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
  },
  initialState,
);

export default kiosksReducer;
