import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { AlertContext } from '../../../Context/Alert/AlertContext';
import { ProductContext } from '../../../Context/Product/ProductContext';

/*
    * Este componente nos ayuda a mostrar la cabecera de la pantalla 
    * Tambien nos permite mostrar una alerta de error o exito de cualquier accion
    * @param {string} title - Titulo de la cabecera 
    * @returns {JSX}
*/
export const HeadBoard = ({ title }) => {
    const alertContext = useContext( AlertContext );
    const { alert } = alertContext;
    
    return (
        <div className='header'>
            { alert && <div className={ `alerta ${ alert.type }` }>{ alert.msg }</div> }

            <h1>{ title }</h1>
        </div>
    );
}

HeadBoard.prototype = {
    title: PropTypes.string.isRequired
}