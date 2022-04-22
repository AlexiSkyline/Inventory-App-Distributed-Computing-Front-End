import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

/*
    * Este compoenente nos ayuda a generar los items o card de las opciones
    * que se encuentran en en las rutas "Inicio", "Pesonal", "Actividades" y "Otros"
    * @param {string} to - Ruta a la que se dirigira el item
    * @param {string} title - Texto que se mostrara en cada card
    * @param {string} description - Texto que se mostrara en cada card
    * @param {object} img - Objeto que contiene informacion de la imagen
    * @returns 
 */

export const OptionCard = ({ to, title, description, img:{ path, classN, alt } }) => {
    return (
        <NavLink
            to={ to }
        >
            <div className='card__info'>
                <div>
                    <img src={ `${ path }` } alt={ alt } className={ classN } />
                </div>

                <h3 className='title__Card'>{ title }</h3>
                <p>{ description }</p>
            </div>
        </NavLink>
    );
}

OptionCard.prototype = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img: PropTypes.object.isRequired
}