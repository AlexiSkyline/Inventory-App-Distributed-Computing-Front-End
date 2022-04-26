import React, { useContext, useState } from 'react'

import { ProviderContext } from '../../Context/Provider/ProviderContext';

import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';

export const ProviderScreen = () => {
    const providerContext = useContext( ProviderContext );
    const { providerList, message, typeMessage, listProviderFound, 
            searchModeStatus, getProviders, desactiveModeEdit, searchProvider } = providerContext;
    
    // * State para almacenar el parametro de busqueda
    const [ formValues, setFormValues ] = useState({
        searchProviderValue: ''
    });
    const { searchProviderValue } = formValues;

    // * Funcion para obtener el parametro de busqueda
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    /*
        * funcion para reiniciar el input de busqueda 
    */
    function handleResetSearchInput() {
        setFormValues({
            searchProviderValue: ''
        });
    }

    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de todos los proveedores'
            />

            <InputSearch
                name={ 'searchProviderValue' }
                value={ searchProviderValue }
                placeholder={ 'Buscar proveedores por su nombre' }
                handleInputChange={ handleInputChange }
            />
            
            {/* <TableProviders
                listProviders={ listProviders }
                handleResetSearchInput={ handleResetSearchInput }
            /> */}

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <FloatingButton />

            {/* <ProviderModal 
                handleResetSearchInput={ handleResetSearchInput }
            /> */}
        </main>
    );
}