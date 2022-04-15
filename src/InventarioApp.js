import React from 'react';
import { AlertState } from './Context/Alert/alertState';
import { AuthState } from './Context/Auth/authState';
import { AppRouter } from './Routers/AppRouter';

export const InventarioApp = () => {
    return (
        <AlertState>
            <AuthState>
                <AppRouter />
            </AuthState>
        </AlertState>
    );
}