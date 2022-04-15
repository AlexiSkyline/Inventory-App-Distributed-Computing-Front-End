import { types } from "../../Types/types";

export const alertReducer = ( state, action ) => {
    switch( action.type ) {
        case types.showAlert:
            return {
                alert: action.payload
            }
        case types.removeAlert:
            return {
                alert: null
            }
        default:
            return state;
    }
}