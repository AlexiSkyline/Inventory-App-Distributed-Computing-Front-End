import { types } from '../../Types/types';

export const modalReducer = ( state, action ) => {
    switch( action.type ) {
        case types.uiOpenModal:
            return {
                modalOpen: true
            }
        case types.uiCloseModal:
            return {
                modalOpen: false
            }
        default:
            return state;
    }
}