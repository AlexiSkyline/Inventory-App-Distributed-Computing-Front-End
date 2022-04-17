import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuContext } from '../../../Context/Menu/MenuContext';

export const Item = ({ text, to, img:{ path, classN, alt } }) => {
    const menuContext = useContext( MenuContext );
    const { myCurrentPage, activeMenu } = menuContext;

    return (
        <NavLink 
            className={ `${ activeMenu ? 'link__open' : 'normal' }` } 
            to={ to }
            onClick={ () => { myCurrentPage( text ); }}
        >
            <div>
                <img src={ `${ path }` } alt={ alt } className={ classN } />
            </div>

            { activeMenu ? <p>{ text } </p> : null }
        </NavLink>
    );
}