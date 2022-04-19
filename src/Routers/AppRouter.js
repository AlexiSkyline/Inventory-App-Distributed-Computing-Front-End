import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginScreen } from '../Components/Auth/LoginScreen';
import { AuthContext } from '../Context/Auth/AuthContext';
import { DashboardRouters } from './DashboardRouters';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRouter';

export const AppRouter = () => {
    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const authContext = useContext( AuthContext );
    const { isAuthenticated } = authContext;

    useEffect(() => {
        if( isAuthenticated ) {
            setIsLoggedIn( true );
        } else {
            setIsLoggedIn( false );
        }
        
        setChecking( false );
    }, [isAuthenticated, setChecking, setIsLoggedIn])
    
    if( checking ) {
        return (
            <div className='loaded__container'>
                <span class='loader'>Espere un momento, por favor....</span>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path='/login'
                    element={ 
                        <PublicRoute isAuthenticated={ isLoggedIn }>
                            <LoginScreen />
                        </PublicRoute>    
                    }
                />

                <Route 
                    path='/*'
                    element={
                        <PrivateRoute isAuthenticated={ isLoggedIn }>
                            <DashboardRouters />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}