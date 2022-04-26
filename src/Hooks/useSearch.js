import { useState } from 'react';

export const useSearch = ( initialState, fn ) => {
    // * State para almacenar el parametro de busqueda
    const [ formValues, setFormValues ] = useState( initialState );

    // * Funcion para obtener el parametro de busqueda
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });

        fn( target.value );
    };

    /*
        * funcion para reiniciar el input de busqueda 
    */
    function handleResetSearchInput() {
        setFormValues( initialState );
    }

    return [ formValues, handleInputChange, handleResetSearchInput ];
}