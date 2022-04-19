import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActivitiesScreen } from '../Components/Home/ActivitiesScreen';
import { HomeScreen } from '../Components/Home/HomeScreen';
import { OtherScreen } from '../Components/Home/OtherScreen';
import { StaffScreen } from '../Components/Home/StaffScreen';
import { ProductScreen } from '../Components/Product/ProductScreen';
import { ToolBar } from '../Components/UI/ToolBar/ToolBar';

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

                    <Route path = '/' element={ <HomeScreen /> }/>
                </Routes>
            </div>
        </>
    );
}