import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const [ user, setUser ] = useState({ logged: false });
    
    return (
        user.logged ? children : ( <Navigate to='/login' /> )   
    );
}