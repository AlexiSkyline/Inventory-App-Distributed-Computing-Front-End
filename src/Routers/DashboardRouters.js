import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActivitiesScreen } from '../Components/Home/ActivitiesScreen';
import { HomeScreen } from '../Components/Home/HomeScreen';
import { StaffScreen } from '../Components/Home/StaffScreen';
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

                    <Route path = '/' element={ <HomeScreen /> }/>
                </Routes>
            </div>
        </>
    );
}