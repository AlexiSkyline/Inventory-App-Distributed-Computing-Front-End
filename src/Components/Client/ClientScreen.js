import React, { useContext, useState } from 'react';

import { ClientContext } from '../../Context/Client/ClientContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';

export const ClientScreen = () => {
    const clientContext = useContext( ClientContext );
    const { clientList, message, typeMessage, listClientFound, searchModeStatus, 
                getClients, desactiveModeEdit, activeModeSearch } = clientContext;

    // * State para guardar la lista de Clientes a mostrar
    const [ listBusiness, getListBusiness ] = useState([]);

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
            
            {/* <TableClients
                clients={ listClient }
                handleResetSearchInput={ handleResetSearchInput }
            /> */}

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <FloatingButton />

            {/* <ClientModal 
                handleResetSearchInput={ handleResetSearchInput }
            /> */}
        </main>
    );
}