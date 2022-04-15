import { useReducer } from 'react';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

import { types } from '../../Types/types';
import { clientAxios } from '../../Config/Axios';

export const AuthState = ( props ) => {
    const initialState = {
        isAuthenticated: null,
        user: null,
        message: null,
        loading: true
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
            dispatch({
                type: types.loginFailed,
                payload: error.response.data.message
            });
        }
    }

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                login
            }}
        >
            { props.children }
        </AuthContext.Provider>
    );
};