import { types } from "../../Types/types";

export const productReducer = ( state, action ) => {
    switch( action.type ) {
        case types.getProducts:
            return {
                ...state,
                products: action.payload,
                loading: false,
            }
        case types.addProduct: {
            return {
                ...state,
                products: [ ...state.products, action.payload ],
                loading: false,
                message: action.payload.message,
                typeMessage: 'alert-ok'
            }
        }
        case types.deleteProduct:
            return {
                ...state,
                message: action.payload,
                loading: false,
                products: state.products.filter( product => product.id !== action.payload.id ),
                message: action.payload.message,
                typeMessage: 'alert-ok'
            }
        case types.activeModeEdit:
            return {
                ...state,
                productModeEdit: true
            }
        case types.desactiveModeEdit:
            return {
                ...state,
                productModeEdit: false
            }
        case types.getProductsFailed:
        case types.deleteProductFailed:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error'
            }
        case types.removeMessages:
            return {
                ...state,
                message: '',
                typeMessage: '',
                error: false
            }
        default:
            return state;
    }
}