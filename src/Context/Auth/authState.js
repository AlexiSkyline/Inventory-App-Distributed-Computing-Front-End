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

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                message: state.message,
                loading: state.loading
            }}
        >
            { props.children }
        </AuthContext.Provider>
    );
};