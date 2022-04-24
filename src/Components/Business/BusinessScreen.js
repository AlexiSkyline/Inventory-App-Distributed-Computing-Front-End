import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../Context/Alert/AlertContext';
import { BusinessContext } from '../../Context/Business/BusinessContext';
import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { BusinessModal } from './BusinessModal';
import { TableBusiness } from './TableBusiness';

export const BusinessScreen = () => {
    const businessContext = useContext( BusinessContext );
    const { business, message, typeMessage, businessSearchFilter, businessSearchFilterStatus, 
                getBusiness, desactiveModeEdit, activeModeSearch } = businessContext;
    
    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de empresas a mostrar
    const [ listBusiness, getListBusiness ] = useState([]);

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
            searchBusinessValue: ''
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
        setTimeout(() => { getBusiness() }, 800);
        if( businessSearchFilterStatus ) {
            getListBusiness( businessSearchFilter );
        } else {
            getListBusiness( business );
        }
        // eslint-disable-next-line
    } , [business, businessSearchFilterStatus] );
    
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

            <TableBusiness
                business={ listBusiness }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <FloatingButton />

            <BusinessModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}