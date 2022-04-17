import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuContext } from '../../../Context/Menu/MenuContext';

export const Item = ({ text, to, img }) => {
    const menuContext = useContext( MenuContext );
    const { myCurrentPage, activeMenu } = menuContext;

    return (
        <NavLink 
            className={ `${ activeMenu ? 'link__open' : 'normal' }` } 
            to={ to }
            onClick={ () => { myCurrentPage( text ); }}
        >
            <div>{ img }</div>

            { activeMenu ? <p>{ text } </p> : null }
        </NavLink>
    );
}