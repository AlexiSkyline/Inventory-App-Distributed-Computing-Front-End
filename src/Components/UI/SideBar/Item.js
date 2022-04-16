import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Context/Auth/AuthContext';

export const Item = ({ text, to, img, open }) => {
    const authContext = useContext( AuthContext );
    const { myCurrentPage } = authContext;

    return (
        <NavLink 
            className={ `${ open ? 'link__open' : 'normal' }` } 
            to={ to }
            onClick={ () => { myCurrentPage( text ); }}
        >
            <div>{ img }</div>

            { open ? <p>{ text } </p> : null }
        </NavLink>
    );
}