import { types } from '../../Types/types';

export const authReducer = ( state, action ) => {
    switch ( action.type ) {
        case types.login:
            localStorage.setItem( 'user', JSON.stringify( action.payload ) );
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                message: action.payload.message,
            };
        case types.logout:
            localStorage.removeItem( 'user' );
            return {
                isAuthenticated: false,
                user: '',
                message: action.payload,
            };
        case types.loginFailed:
            localStorage.removeItem( 'user' );
            return {
                ...state,
                isAuthenticated: false,
                user: '',
                message: action.payload
            }
        default:
            return state;
    }
}