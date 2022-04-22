import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { MenuContext } from '../../../Context/Menu/MenuContext';

/*
    * En este componente generamos los items de la barra lateral
    * @param {string} text - Texto que se mostrara en el item
    * @param {string} to - Ruta a la que se dirigira el item
    * @param {Object} img - Objeto que contiene informacion de la imagen
    * @returns 
 */
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

Item.prototype = { 
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    img: PropTypes.object.isRequired
}