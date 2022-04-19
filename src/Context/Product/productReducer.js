import { types } from "../../Types/types";

export const productReducer = ( state, action ) => {
    switch( action.type ) {
        case types.getProducts:
            return {
                ...state,
                products: action.payload,
                loading: false,
            }
        case types.getProductsFailed: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        default:
            return state;
    }
}