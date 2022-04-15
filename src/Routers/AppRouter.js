import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginScreen } from '../Components/Auth/LoginScreen';
import { DashboardRouters } from './DashboardRouters';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRouter';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path='/login'
                    element={ 
                        <PublicRoute>
                            <LoginScreen />
                        </PublicRoute>    
                    }
                />

                <Route 
                    path='/*'
                    element={
                        <PrivateRoute>
                            <DashboardRouters />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}