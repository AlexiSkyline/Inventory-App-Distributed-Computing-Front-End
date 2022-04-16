import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeScreen } from '../Components/Home/HomeScreen';
import { ToolBar } from '../Components/UI/ToolBar/ToolBar';

export const DashboardRouters = () => {
    return (
        <>
            <ToolBar />

            <div>
                <Routes>
                    <Route path = '/ventas' />
                    <Route path = '/home' element={ <HomeScreen /> }/>

                    <Route path = '/' element={ <HomeScreen /> }/>
                </Routes>
            </div>
        </>
    );
}