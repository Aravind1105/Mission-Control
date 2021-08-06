import { handleActions } from 'redux-actions';
import { setProductsPagination } from '../actions/paginationActions';

const initialState = {
  products: {},
};

const paginationReducer = handleActions(
  {
    [setProductsPagination]: (state, { payload }) => ({
      ...state,
      products: payload,
    }),
  },
  initialState,
);

export default paginationReducer;
