import React, { useContext, useEffect, useState } from 'react'
import { useSearch } from '../../Hooks/useSearch';

import { ProviderContext } from '../../Context/Provider/ProviderContext';
import { AlertContext } from '../../Context/Alert/AlertContext';

import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { TableProviders } from './TableProviders';
import { ProviderModal } from './ProviderModal';

export const ProviderScreen = () => {
    const providerContext = useContext( ProviderContext );
    const { providerList, message, typeMessage, listProviderFound, 
            searchModeStatus, getProviders, desactiveModeEdit, searchProvider } = providerContext;
    
    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de Proveedore a mostrar
    const [ listProviders, getListProviders ] = useState([]);

    const [ formValues, handleInputChange, handleResetSearchInput ] = useSearch( { searchProviderValue: '' }, searchProvider );
    const { searchProviderValue } = formValues;

    /*
        * Mostramos el mesaje si existe uno en el state
        * El otro caso es que no se muestre ningun mensaje
    */
    useEffect( () => {
        if( message ) {
            showAlert( message, typeMessage );
        }
        // eslint-disable-next-line
    } , [message] );

    /* 
        * Obtenemos los proveedores y cargarlos en el state
        * El otro caso es obtener los proveedores filtrados si el status es true
    */
    useEffect( () => {
        setTimeout(() => { getProviders() }, 800);
        if( searchModeStatus ) {
            getListProviders( listProviderFound );
        } else {
            getListProviders( providerList );
        }
        // eslint-disable-next-line
    }, [ providerList, searchModeStatus ] );

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
                listProviders={ listProviders }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <FloatingButton />

            <ProviderModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}