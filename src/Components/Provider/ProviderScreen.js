import React, { useContext, useEffect, useState } from 'react'

import { ProviderContext } from '../../Context/Provider/ProviderContext';

import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { TableProviders } from './TableProviders';

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

    /* 
        * Obtenemos los proveedores y cargarlos en el state
        * El otro caso es obtener los proveedores filtrados si el status es true
    */
    useEffect( () => {
        setTimeout(() => { getProviders() }, 800);
        // eslint-disable-next-line
    }, [ providerList ] );

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
            
            <TableProviders
                listProviders={ providerList }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <FloatingButton />

            {/* <ProviderModal 
                handleResetSearchInput={ handleResetSearchInput }
            /> */}
        </main>
    );
}