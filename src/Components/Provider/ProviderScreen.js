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
    const headers = [ 'ID' ,'Nombre' ,'Apellidos' ,'RFC' ,'Dirección' ,'Email' ,'Telefono' ];
    const providerContext = useContext( ProviderContext );
    const { providerList, message, typeMessage, listProviderFound, 
            searchModeStatus, getProviders, desactiveModeEditProviders, searchProvider } = providerContext;
    
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
    } , [ message, showAlert, typeMessage ]);

    /* 
        * Obtenemos la lista de Proveedores para mostrar dependiendo de
        * 1: Si el modo de busqueda esta activo, mostramos la lista de Proveedores encontrados
        * 2: Caso contrario, mostramos la lista completa de Proveedores
    */
    useEffect( () => {
        if( searchModeStatus ) {
            getListProviders( listProviderFound );
        } else {
            getListProviders( providerList );
        }
    }, [ providerList, searchModeStatus, listProviderFound ] );
    
    /*
        * En esta parte mandamos a llamar el metodo para obtener las Proveedores cuando la pagina
        * carga por primera vez o cuando se recarga la pagina
    */
    // eslint-disable-next-line
    useEffect( () => { getProviders() } , []);

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
                titles={ headers }
                listProviders={ listProviders }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEditProviders }/>

            <FloatingButton />

            <ProviderModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}