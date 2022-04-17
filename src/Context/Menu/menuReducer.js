import { types } from '../../Types/types';

export const menuReducer = ( state, action ) => {
    switch( action.type ) {
        case types.currentPage:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.menuIsActive:
            return {
                ...state,
                activeMenu: !state.activeMenu
            }
        default:
            return state;
    }
}