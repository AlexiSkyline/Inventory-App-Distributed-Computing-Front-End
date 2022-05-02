import { types_sales } from '../../Types/types.sales';

export const salesReducer = ( state, action ) =>  {
    switch( action.type ) {
        case types_sales.removeMessages:
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