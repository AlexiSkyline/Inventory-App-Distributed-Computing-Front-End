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