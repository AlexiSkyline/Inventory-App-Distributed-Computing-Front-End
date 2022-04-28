import { types_SalesDetail } from '../../Types/types.salesDetailReducer';

export const salesDetailReducer = ( state, action ) => {
    switch ( action.type ) {
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