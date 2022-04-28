import React from 'react';
import { AlertState } from './Context/Alert/alertState';
import { AuthState } from './Context/Auth/authState';
import { BrandState } from './Context/Brand/brandState';
import { BusinessState } from './Context/Business/businessState';
import { ClientState } from './Context/Client/clientState';
import { MenuState } from './Context/Menu/menuState';
import { ModalState } from './Context/Modal/modalState';
import { ModeEditState } from './Context/ModeEdit/modeEditState';
import { ProductState } from './Context/Product/productState';
import { ProviderState } from './Context/Provider/providerState';
import { SalesDetailState } from './Context/SalesDetail/salesDetailState';
import { SellerState } from './Context/Seller/sellerState';
import { UnitMeasurementState } from './Context/UnitMeasurement/unitMeasurementState';
import { AppRouter } from './Routers/AppRouter';

export const InventarioApp = () => {
    return (
        <ModeEditState>
            <SalesDetailState>
                <SellerState>
                    <ProviderState>
                        <ClientState>
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
                        </ClientState>
                    </ProviderState>
                </SellerState>
            </SalesDetailState>
        </ModeEditState>
    );
}