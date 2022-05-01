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
        case types.updateProduct:
            return {
                ...state,
                products: state.products.map( product => product.id === action.payload.id ? action.payload : product ),
                message: action.payload.message,
                typeMessage: 'alert-ok',
                loading: false
            }
        case types.deleteProduct:
            return {
                ...state,
                products: state.products.filter( product => product.id !== action.payload.id ),
                message: action.payload.message,
                typeMessage: 'alert-ok',
                loading: false
            }
        case types.searchProductActive:
            return {
                ...state,
                productSearchFilterStatus: true,
                productSearchFilter: state.products.filter( product => product.description.toLowerCase().includes( action.payload.toLowerCase() ) )        
            }
        case types.searchProductDesactive:
            return {
                ...state,
                productSearchFilterStatus: false,
                productSearchFilter: []
            }
        case types.activeModeEdit:
            return {
                ...state,
                productModeEdit: true,
                productEdit: action.payload
            }
        case types.desactiveModeEdit:
            return {
                ...state,
                productModeEdit: false,
                productEdit: null
            }
        case types.addProductFailed:
        case types.getProductsFailed:
        case types.deleteProductFailed:
        case types.updateProductFailed:
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