const initialState = {
  products: [],
};

export default (state = initialState, action = {}) => {
  if (typeof action.type === 'undefined') return;

  switch (action.type) {
    case 'SET_PRODUCTS': {
      return { ...state, ...{ products: action.payload } };
    }

    default:
      return state;
  }
};
