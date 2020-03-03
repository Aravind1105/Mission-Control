import { handleActions } from 'redux-actions';
import { findIndex, propEq, update } from 'ramda';
import { updateKiosks, updateKioskById } from '../actions';

const initialState = [];

export const kiosksReducer = handleActions(
  {
    [updateKiosks]: (state, { payload }) => payload,
    [updateKioskById]: (state, { payload }) => {
      const index = findIndex(propEq('_id', payload._id))(state);
      return update(index, { ...state[index], ...payload }, state);
    },
  },
  initialState,
);

export default kiosksReducer;
