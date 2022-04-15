import { types } from '../../Types/types';

export const authReducer = ( state, action ) => {
    switch ( action.type ) {
        case types.login:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                message: null
            };
        case types.logout:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                message: action.payload
            };
        default:
            return state;
    }
}