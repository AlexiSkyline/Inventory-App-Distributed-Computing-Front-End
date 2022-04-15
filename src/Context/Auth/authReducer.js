import { types } from '../../Types/types';

export const authReducer = ( state, action ) => {
    switch ( action.type ) {
        case types.login:
            localStorage.setItem( 'user', JSON.stringify( state.user ) );
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                message: action.payload.message,
            };
        case types.logout:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                message: action.payload
            };
        case types.loginFailed:
            localStorage.removeItem( 'user' );
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                message: action.payload
            }
        default:
            return state;
    }
}