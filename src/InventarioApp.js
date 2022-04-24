import React from 'react';
import { AlertState } from './Context/Alert/alertState';
import { AuthState } from './Context/Auth/authState';
import { BrandState } from './Context/Brand/brandState';
import { BusinessState } from './Context/Business/businessState';
import { MenuState } from './Context/Menu/menuState';
import { ModalState } from './Context/Modal/modalState';
import { ProductState } from './Context/Product/productState';
import { UnitMeasurementState } from './Context/UnitMeasurement/unitMeasurementState';
import { AppRouter } from './Routers/AppRouter';

export const InventarioApp = () => {
    return (
        <BusinessState>
            <UnitMeasurementState>     
                <BrandState>
                    <ModalState>
                        <ProductState>
                            <AlertState>
                                <AuthState>
                                    <MenuState>
                                        <AppRouter />
                                    </MenuState>
                                </AuthState>
                            </AlertState>
                        </ProductState>
                    </ModalState>
                </BrandState>
            </UnitMeasurementState>
        </BusinessState>
    );
}