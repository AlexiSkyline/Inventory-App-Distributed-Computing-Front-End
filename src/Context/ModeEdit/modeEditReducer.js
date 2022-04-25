import { types } from '../../Types/types';

export const modeEditReducer = ( state, action ) => {
    switch( action.type ) {
        case types.activeModeEdit:
            return {
                ...state,
                statusEditMode: true,
                editInfo: action.payload
            }
        case types.desactiveModeEdit:
            return {
                ...state,
                statusEditMode: false,
                editInfo: null
            }
        default:
            return state;
    }
}