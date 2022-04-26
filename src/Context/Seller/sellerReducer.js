import { types_seller } from '../../Types/types.seller';

export const sellerReducer = ( state, action ) => {
    switch( action.type ) {
        case types_seller.addSeller:
            return {
                ...state,
                sellerList: [ ...state.sellerList, action.payload ],
                message: action.payload.message,
                typeMessage: 'alert-ok'
            }
        case types_seller.getSellers:
            return {
                ...state,
                sellerList: action.payload
            }
        case types_seller.updateSeller:
            return {
                ...state,
                message: action.payload,
                typeMessage: 'alert-ok',
            }
        case types_seller.addSellerFailed:
        case types_seller.getSellersFailed:
        case types_seller.updateSellerFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error'
            }
        case types_seller.removeMessages: 
            return {
                ...state,
                message: '',
                typeMessage: '',
                error: false,
            }
        default:
            return state;
    }
}