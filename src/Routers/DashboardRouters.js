import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeScreen } from '../Components/Home/HomeScreen';

export const DashboardRouters = () => {
    return (
        <>
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