import React from 'react';
import { AuthState } from './Context/Auth/authState';
import { AppRouter } from './Routers/AppRouter';

export const InventarioApp = () => {
    return (
        <AuthState>
            <AppRouter />
        </AuthState>
    );
}