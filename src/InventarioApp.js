import React from 'react';
import { AlertState } from './Context/Alert/alertState';
import { AuthState } from './Context/Auth/authState';
import { MenuState } from './Context/Menu/menuState';
import { ProductState } from './Context/Product/productState';
import { AppRouter } from './Routers/AppRouter';

export const InventarioApp = () => {
    return (
        <ProductState>
            <AlertState>
                <AuthState>
                    <MenuState>
                        <AppRouter />
                    </MenuState>
                </AuthState>
            </AlertState>
        </ProductState>
    );
}