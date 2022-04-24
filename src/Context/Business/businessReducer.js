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
        case types_business.updateBusiness:
        case types_business.deleteBusiness:
            return {
                ...state,
                message: action.payload,
                typeMessage: 'alert-ok',
            }
        case types_business.addBusinessFailed:
        case types_business.getBusinessFailed:
        case types_business.updateBusinessFailed:
        case types_business.deleteBusinessFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error',
            }
        case types_business.searchBusinesActive:
            return {
                ...state,
                businessSearchFilterStatus: true,
                businessSearchFilter: state.business.filter( brand => brand.name.toLowerCase().includes( action.payload.toLowerCase() ) )
            }
        case types_business.searchBusinesDesactive:
            return {
                ...state,
                businessSearchFilterStatus: false,
                businessSearchFilter: []
            }
        case types_business.activeModeEdit:
            return {
                ...state,
                businessModeEdit: true,
                businessEdit: action.payload
            }
        case types_business.desactiveModeEdit:
            return {
                ...state,
                businessModeEdit: false,
                businessEdit: null
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