import React from 'react';
import { AlertState } from './Context/Alert/alertState';
import { AuthState } from './Context/Auth/authState';
import { MenuState } from './Context/Menu/menuState';
import { AppRouter } from './Routers/AppRouter';

export const InventarioApp = () => {
    return (
        <AlertState>
            <AuthState>
                <MenuState>
                    <AppRouter />
                </MenuState>
            </AuthState>
        </AlertState>
    );
}