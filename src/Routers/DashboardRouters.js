import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const DashboardRouters = () => {
    return (
        <>
            <div>
                <Routes>
                    <Route path = '/ventas' />

                    <Route path = '/inicio' />
                </Routes>
            </div>
        </>
    );
}