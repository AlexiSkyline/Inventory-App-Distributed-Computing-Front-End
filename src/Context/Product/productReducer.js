import { types } from "../../Types/types";

export const productReducer = ( state, action ) => {
    switch( action.type ) {
        case types.getProducts:
            return {
                ...state,
                products: action.payload,
                loading: false,
            }
        case types.addProduct:
            return {
                ...state,
                products: [ ...state.products, action.payload ],
                loading: false,
                message: action.payload.message,
                typeMessage: 'alert-ok'
            }
        case types.updateProduct:
        case types.deleteProduct:
            return {
                ...state,
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
        case types.searchProductById:
            return {
                ...state,
                productSearchFilterStatus: true,
                productSearchFilter: state.products.filter( product => product.id.includes( action.payload ) )
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
        case types.searchProductByIdFailed:
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