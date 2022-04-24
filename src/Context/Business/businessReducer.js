import { types_business } from '../../Types/types.business'

export const businessReducer = ( state, action ) => {
    switch( action.type ) {
        case types_business.removeMessages:
            return {
                ...state,
                message: '',
                typeMessage: '',
                error: false
            }
        default :
            return state;
    }
}