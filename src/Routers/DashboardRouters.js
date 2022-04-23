import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { HomeScreen } from '../Components/Home/HomeScreen';
import { StaffScreen } from '../Components/Home/StaffScreen';
import { ActivitiesScreen } from '../Components/Home/ActivitiesScreen';
import { OtherScreen } from '../Components/Home/OtherScreen';

import { BrandScreen } from '../Components/Brand/BrandScreen';
import { ProductScreen } from '../Components/Product/ProductScreen';

import { ToolBar } from '../Components/UI/ToolBar/ToolBar';
import { UnitMeasurementScreen } from '../Components/UnitMeasurement/UnitMeasurementScreen';

export const DashboardRouters = () => {
    return (
        <>
            <ToolBar />

            <div>
                <Routes>
                    <Route path = '/home' element={ <HomeScreen /> }/>
                    <Route path = '/staff' element={ <StaffScreen /> }/>
                    <Route path = '/activities' element={ <ActivitiesScreen /> }/>
                    <Route path = '/other' element={ <OtherScreen /> }/>
                    
                    <Route path = '/productos' element={ <ProductScreen /> }/>
                    <Route path = '/marca' element={ <BrandScreen /> }/>
                    <Route path = '/medidas' element={ <UnitMeasurementScreen /> }/>

                    <Route path = '/' element={ <HomeScreen /> }/>
                </Routes>
            </div>
        </>
    );
}