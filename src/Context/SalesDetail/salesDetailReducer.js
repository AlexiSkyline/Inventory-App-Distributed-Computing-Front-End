import { types_SalesDetail } from '../../Types/types.salesDetailReducer';

export const salesDetailReducer = ( state, action ) => {
    switch ( action.type ) {
        case types_SalesDetail.getSalesDetail:
            return {
                ...state,
                salesDetailList: action.payload
            }
        case types_SalesDetail.updateSalesDetail:
        case types_SalesDetail.deleteSalesDetail:
            return {
                ...state,
                message: action.payload,
                typeMessage: 'alert-ok',
            }
        case types_SalesDetail.getSalesDetailFailed:
        case types_SalesDetail.updateSalesDetailFailed:
        case types_SalesDetail.deleteSalesDetailFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error'
            }
        case types_SalesDetail.removeMessages:
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