import { types } from '../../Types/types';

export const menuReducer = ( state, action ) => {
    switch( action.type ) {
        case types.currentPage:
            return {
                alert: action.payload
            }
        case types.menuIsActive:
            return {
                alert: null
            }
        default:
            return state;
    }
}