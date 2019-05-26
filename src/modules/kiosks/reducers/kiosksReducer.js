import { handleActions } from 'redux-actions';
import { findIndex, propEq, update } from 'ramda';
import { KIOSKS_STATE_UPDATE, KIOSKS_STATE_UPDATE_BY_ID } from '../actions/kioskActions';

const initialState = [];

export const kiosksReducer = handleActions(
  {
    [KIOSKS_STATE_UPDATE]: (state, { payload }) => payload,
    [KIOSKS_STATE_UPDATE_BY_ID]: (state, { payload }) => {
      const index = findIndex(propEq('_id', payload._id))(state);
      return update(index, { ...state[index], ...payload }, state);
    },
  },
  initialState,
);

export default kiosksReducer;
