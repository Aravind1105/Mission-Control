import { handleActions } from 'redux-actions';
import { PRODUCTS_STATE_UPDATE, TAX_STATE_UPDATE, FAMILY_STATE_UPDATE } from '../actions/productActions';

const initialState = {
    product: [],
    family: [],
    tax: []
};

export const productsReducer = handleActions(
    {
        [PRODUCTS_STATE_UPDATE]: (state, { payload }) => ({
            ...state,
            product: payload,
        }),
        [FAMILY_STATE_UPDATE]: (state, { payload }) => ({
            ...state,
            family: payload,
        }),
        [TAX_STATE_UPDATE]: (state, { payload }) => ({
            ...state,
            tax: payload,
        }),

    },
    initialState,
);

export default productsReducer;

// export default function productsReducer(state = initialState, action) {
//     switch (action.type) {
//         case PRODUCTS_STATE_UPDATE:
//             return {
//                 ...state,
//                 product: action.payload
//             }
//         case FAMILY_STATE_UPDATE:
//             return {
//                 ...state,
//                 family: action.payload
//             }
//         case TAX_STATE_UPDATE:
//             return {
//                 ...state,
//                 tax: action.payload
//             }
//         default:
//             return state;
//     }
// }