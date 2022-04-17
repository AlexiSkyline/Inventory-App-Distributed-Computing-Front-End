import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuContext } from '../../../Context/Menu/MenuContext';

export const Item = ({ text, to, img, open }) => {
    const menuContext = useContext( MenuContext );
    const { myCurrentPage } = menuContext;

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