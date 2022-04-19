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
        case types.deleteProduct:
            return {
                ...state,
                message: action.payload,
                loading: false,
                products: state.products.filter( product => product.id !== action.payload )
            }
        default:
            return state;
    }
}