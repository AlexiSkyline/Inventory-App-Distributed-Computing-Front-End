import { useReducer } from 'react';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

import { types } from '../../Types/types';
import { clientAxios } from '../../Config/Axios';

export const AuthState = ( props ) => {
    const initialState = {
        isAuthenticated: localStorage.getItem( 'user' ) ? true : false,
        user: localStorage.getItem( 'user' ) ? JSON.parse( localStorage.getItem( 'user' ) ) : null,
        message: null,
        loading: true,
    }

    const [ state, dispatch ] = useReducer( authReducer, initialState );

    // * Cuando el usuario inicia sesión
    const login = async( userData ) => {
        try {
            const response = await clientAxios.post( '/api/Auth/Login' ,userData );
            response.data.isAuthenticated = true;
            dispatch({
                type: types.login,
                payload: response.data
            });
        } catch (error) {
            const alert = {
                msg: error.response.data.message,
                type: 'alert-error'
            }
            dispatch({
                type: types.loginFailed,
                payload: alert
            });
        }
    }

    const logout = () => {
        dispatch({
            type: types.logout
        });
    }

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                login,
                logout
            }}
        >
            { props.children }
        </AuthContext.Provider>
    );
};