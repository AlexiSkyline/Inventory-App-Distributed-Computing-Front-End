import { types } from "../../Types/types";

export const alertReducer = ( state, action ) => {
    switch( action.type ) {
        case types.showAlert:
            return {
                ...state,
                alert: action.payload
            }
        case types.removeAlert:
            return {
                ...state,
                alert: null
            }
        case types.addGlobalMessage:
            return {
                ...state,
                globalMessage: action.payload
            }
        default:
            return state;
    }
}