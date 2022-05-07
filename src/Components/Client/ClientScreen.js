import React, { useContext, useEffect, useState } from 'react';
import { useSearch } from '../../Hooks/useSearch';

import { AlertContext } from '../../Context/Alert/AlertContext';
import { ClientContext } from '../../Context/Client/ClientContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { ClientModal } from './ClientModal';
import { TableClients } from './TableClients';

export const ClientScreen = () => {
    const headers = [ 'ID' ,'Nombre' ,'Apellidos' ,'RFC' ,'Dirección' ,'Email' ,'Telefono' ];
    const clientContext = useContext( ClientContext );
    const { clientList, message, typeMessage, listClientFound, searchModeStatus, 
                getClients, desactiveModeEditClient, searchClient, disactiveClientSearchMode } = clientContext;
    
    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de Clientes a mostrar
    const [ listClients, getListClients ] = useState([]);

    const [ formValues, handleInputChange, handleResetSearchInput ] = useSearch( { searchClientValue: '' }, searchClient );
    const { searchClientValue } = formValues;

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
        * Obtenemos la lista de Clientes para mostrar dependiendo de
        * 1: Si el modo de busqueda esta activo, mostramos la lista de Clientes encontrados
        * 2: Caso contrario, mostramos la lista completa de Clientes
    */
    useEffect( () => {
        if( searchModeStatus ) {
            getListClients( listClientFound );
        } else {
            getListClients( clientList );
        }
    }, [ clientList, searchModeStatus, listClientFound ]);

    /*
        * En esta parte mandamos a llamar el metodo para obtener las Clientes cuando la pagina
        * carga por primera vez o cuando se recarga la pagina
    */ 
    useEffect( () => {
       disactiveClientSearchMode();
       getClients() 
       // eslint-disable-next-line
    } , []);

    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de todos los clientes'
            />

            <InputSearch
                name={ 'searchClientValue' }
                value={ searchClientValue }
                placeholder={ 'Buscar clientes por su nombre' }
                handleInputChange={ handleInputChange }
            />
            
            <TableClients
                titles={ headers }
                listClients={ listClients }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEditClient }/>

            <FloatingButton />

            <ClientModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}