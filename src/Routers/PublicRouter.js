import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
    const [ user, setUser ] = useState({ logged: false });

    return (
        user.logged ? ( <Navigate to='/' /> ) : children
    );
}