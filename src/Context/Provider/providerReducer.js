import { types_provider } from "../../Types/types.provider";

export const providerReducer = ( state, action ) => {
    switch( action.type ) { 
        case types_provider.addProvider:
            return {
                ...state,
                providerList: [ action.payload, ...state.providerList ],
                message: action.payload.message,
                typeMessage: 'alert-ok'
            }
        case types_provider.getProviders:
            return {
                ...state,
                providerList: action.payload
            }
        case types_provider.updateProvider:
        case types_provider.deleteProvider:
            return {
                ...state,
                message: action.payload.message,
                typeMessage: 'alert-ok'
            }
        case types_provider.addProviderFailed:
        case types_provider.getProvidersFailed:
        case types_provider.updateProviderFailed:
        case types_provider.deleteProviderFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error'
            }
        case types_provider.removeMessages:
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