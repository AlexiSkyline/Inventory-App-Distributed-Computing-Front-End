import React, { useContext, useEffect, useState } from 'react'
import { BusinessContext } from '../../Context/Business/BusinessContext';
import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';

export const BusinessScreen = () => {
    const businessContext = useContext( BusinessContext );
    const { business, message, typeMessage, businessSearchFilter, businessSearchFilterStatus, 
                getBusiness, desactiveModeEdit, activeModeSearch } = businessContext;

    // * State para almacenar el parametro de busqueda
    const [ formValues, setFormValues ] = useState({
        searchBusinessValue: ''
    });
    const { searchBusinessValue } = formValues;

    // * Funcion para obtener el parametro de busqueda
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });

        activeModeSearch( target.value );
    };

    /*
        * funcion para reiniciar el input de busqueda 
    */
    function handleResetSearchInput() {
        setFormValues({
            searchBrandValue: ''
        });
    }

    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de todas las empresas'
            />

            <InputSearch
                name={ 'searchBusinessValue' }
                value={ searchBusinessValue }
                placeholder={ 'Buscar empresa por su nombre' }
                handleInputChange={ handleInputChange }
            />

            {/* <TableBrands
                titles={ headers }
                brands={ listBrands }
                handleResetSearchInput={ handleResetSearchInput }
            /> */}

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <FloatingButton />

            {/* <BrandModal 
                handleResetSearchInput={ handleResetSearchInput }
            /> */}
        </main>
    );
}