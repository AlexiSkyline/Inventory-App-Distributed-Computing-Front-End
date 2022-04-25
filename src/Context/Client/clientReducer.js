import { types_client } from '../../Types/types.client';

export const clientReducer = ( state, action ) => {
    switch( action.type ) {
        case types_client.addClient:
            return {
                ...state,
                clientList: [ ...state.clientList, action.payload ],
                message: action.payload.message,
                typeMessage: 'alert-ok',
            }
        case types_client.getClient:
            return {
                ...state,
                clientList: action.payload,
            }
        case types_client.updateClient:
        case types_client.deleteClient:
            return {
                ...state,
                message: action.payload,
                typeMessage: 'alert-ok',
            }
        case types_client.addClientFailed:
        case types_client.getClientFailed:
        case types_client.updateClientFailed:
        case types_client.deleteClientFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error',
            }
        case types_client.activeModeEdit:
            return {
                ...state,
                statusEditModeClient: true,
                infClientEdit: action.payload
            }
        case types_client.desactiveModeEdit:
            return {
                ...state,
                statusEditModeClient: false,
                infClientEdit: null
            }
        case types_client.searchClientActive:
            return {
                ...state,
                searchModeStatus: true,
                listClientFound: state.peopleList.filter( person => person.name.toLowerCase().includes( action.payload.toLowerCase() ) )
            }
        case types_client.searchClientDesactive:
            return {
                ...state,
                searchModeStatus: false,
                listClientFound: []
            }
        case types_client.removeMessages: 
            return {
                ...state,
                message: '',
                typeMessage: '',
                error: false,
            }
        default : 
            return state;
    }
}