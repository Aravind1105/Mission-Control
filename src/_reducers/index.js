import app from './appReducer'
import fridges from './fridgesReducer'
import organizations from './organizationsReducer'
import products from './productsReducer'

export { default as app }  from './appReducer';
export { default as fridges }  from './fridgesReducer';
export { default as organizations }  from './organizationsReducer';
export { default as products }  from './productsReducer';

/**
 * Aggregation of reducers
 * Remember: the same action.type can be picked up by more than 1 reducer
 */

// export { default as app }  from './AppReducer';