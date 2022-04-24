import { types_business } from '../../Types/types.business'

export const businessReducer = ( state, action ) => {
    switch( action.type ) {
        case types_business.addBusiness:
            return {
                ...state,
                business: [ ...state.business, action.payload ],
                message: action.payload.message,
                typeMessage: 'alert-ok',
            }
        case types_business.getBusiness: 
            return {
                ...state,
                business: action.payload,
            }
        case types_business.addBusinessFailed:
        case types_business.getBusinessFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error',
            }
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