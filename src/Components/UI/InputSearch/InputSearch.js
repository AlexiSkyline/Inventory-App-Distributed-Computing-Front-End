import React from 'react';
import PropTypes from 'prop-types';

/*
    *@description Componente que renderiza un input que nos permite buscar x cosa de una lista
    *@param {string} name - Nombre del input
    *@param {string} value - Valor del input
    *@param {string} placeholder - Texto que se muestra en el input
    *@param {function} handleInputChange - Funcion que maneja el cambio de valor del input
*/
export const InputSearch = ({ name, value, placeholder, handleInputChange }) => {
    return (
        <div className='input__search-box'>
            <input 
                type='text'
                placeholder={ placeholder }
                className='form-control'
                name={ name }
                value={ value }
                onChange={ handleInputChange }
            />
        </div>
    );
}

InputSearch.prototype = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired
}