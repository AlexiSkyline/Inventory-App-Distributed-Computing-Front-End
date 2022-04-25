import React, { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../Context/Alert/AlertContext';

import { ClientContext } from '../../Context/Client/ClientContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { ClientModal } from './ClientModal';
import { TableClients } from './TableClients';

export const ClientScreen = () => {
    const clientContext = useContext( ClientContext );
    const { clientList, message, typeMessage, listClientFound, searchModeStatus, 
                getClients, desactiveModeEdit, activeModeSearch } = clientContext;
    
    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de Clientes a mostrar
    const [ listClients, getListClients ] = useState([]);

    // * State para almacenar el parametro de busqueda
    const [ formValues, setFormValues ] = useState({
        searchClientValue: ''
    });
    const { searchClientValue } = formValues;

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
            searchClientValue: ''
        });
    }

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
        * Obtenemos las empresas y cargarlos en el state
        * El otro caso es obtener las empresas filtrados si el status es true
    */
    useEffect( () => {
        setTimeout(() => { getClients() }, 800);
    }, [ clientList ] );

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
                listClients={ clientList }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <FloatingButton />

            <ClientModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}